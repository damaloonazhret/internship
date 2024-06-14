import { Component, ComponentType } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";
import { getAllSessionStorage } from "../../../services/sessionStorage/getAllSessionStorage";
import "../index.scss";
import { Text } from "../../../components/common/InfoText/Text";
import { AppDispatch, RootState } from "../../../store/app/store";
import { connect, ConnectedProps } from "react-redux";
import { fetchColorsCC } from "../../../store/colors/colorsThunks";

export interface RouterProps {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
}

export interface WithRouterProps {
  router?: RouterProps;
}

interface ColorsCCState {
  currentPage: number;
  activities: UserSelectedColors;
}

export type LinkColorData = Readonly<{
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}>;

export type UserSelectedColors = { [key: string]: string };

type PropsFromRedux = ConnectedProps<typeof connector>;

type ColorsCCProps = PropsFromRedux & WithRouterProps;

export function withRouter<T>(Component: ComponentType<T & WithRouterProps>) {
  function ComponentWithRouterProp(props: T) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class ColorsCC extends Component<ColorsCCProps, ColorsCCState> {
  state: ColorsCCState = {
    currentPage: 1,
    activities: {},
  };

  itemsPerPage = 40;
  sortedColorsCache: LinkColorData[] | null = null;
  prevColors: LinkColorData[] | null = null;

  componentDidMount() {
    this.props.fetchColors();

    let params = new URLSearchParams();
    if (this.props.router) {
      const { location } = this.props.router;
      params = new URLSearchParams(location.search);
    }
    const page = params.get("page");
    const sessionPage = sessionStorage.getItem("currentPage");

    this.setActivities();

    if (page) {
      this.setState({ currentPage: Number(page) });
    }
    if (sessionPage) {
      this.setState({ currentPage: Number(sessionPage) });
    }
  }

  componentDidUpdate(prevProps: WithRouterProps, prevState: ColorsCCState) {
    if (this.props.router && prevProps.router) {
      if (
        this.props.router.location.search !== prevProps.router.location.search
      ) {
        const params = new URLSearchParams(this.props.router.location.search);
        const page = params.get("page");
        if (page) {
          this.setState({ currentPage: Number(page) });
        }
      }
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.setActivities();
    }
  }

  shouldComponentUpdate(nextProps: PropsFromRedux, nextState: ColorsCCState) {
    return (
      this.props.colors !== nextProps.colors ||
      this.state.currentPage !== nextState.currentPage
    );
  }

  setActivities = () => {
    const allSessionStorage = getAllSessionStorage();

    if (allSessionStorage) {
      this.setState({ activities: allSessionStorage });
    }
  };

  componentWillUnmount() {
    if (this.state.currentPage) {
      sessionStorage.setItem("currentPage", String(this.state.currentPage));
    }
  }

  handlePageChange = (pageNumber: number) => {
    if (this.props.router) {
      const { navigate, location } = this.props.router;
      const params = new URLSearchParams();
      params.append("page", String(pageNumber));
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
      this.setState({ currentPage: pageNumber });
    }
  };

  getSortedColors = (colors: LinkColorData[]): LinkColorData[] => {
    if (colors === this.prevColors) {
      return this.sortedColorsCache || [];
    }

    this.sortedColorsCache = sortColors(colors);
    this.prevColors = colors;

    return this.sortedColorsCache;
  };

  getPaginatedColors = (sortedColors: LinkColorData[]) => {
    const { currentPage } = this.state;
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return sortedColors.slice(startIndex, endIndex);
  };

  render() {
    const { colors, isLoading, error } = this.props;
    const { currentPage, activities } = this.state;
    const sortedColors = this.getSortedColors(colors);
    const paginatedColors = this.getPaginatedColors(sortedColors);

    return error ? (
      <Text text={error} className="colors-error" />
    ) : isLoading ? (
      <MainLoader />
    ) : (
      <ColorsPage
        totalItems={colors.length}
        currentPage={currentPage}
        activities={activities}
        itemsPerPage={this.itemsPerPage}
        paginatedColors={paginatedColors}
        onPageChange={this.handlePageChange}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  colors: state.colorsCC.colors,
  isLoading: state.colorsCC.isLoading,
  error: state.colorsCC.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchColors: () => dispatch(fetchColorsCC()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withRouter(ColorsCC));
