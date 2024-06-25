import {Component, ComponentType} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import "./index.scss";
import {connect, ConnectedProps} from "react-redux";
import {getAllSessionStorage} from "services/sessionStorage/getAllSessionStorage";
import {sortColors} from "services/colors/sortColors";
import {MainLoader} from "components/common/Loaders/MainLoader";
import {ColorsPage} from "pages/Colors/components/ColorsPage";
import {AppDispatch, RootState} from "app/store";
import {fetchColors} from "features/JSONPlaceholder/JSONPlaceholderThunk";
import {Txt} from "components/common/InfoText/Txt";

export interface RouterProps {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
}

export interface WithRouterProps {
  router?: RouterProps;
}

interface ColorsState {
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

type ColorsProps = PropsFromRedux & WithRouterProps;

export function withRouter<T>(Component: ComponentType<T & WithRouterProps>) {
  function ComponentWithRouterProp(props: T) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{location, navigate, params}}/>;
  }

  return ComponentWithRouterProp;
}

class Colors extends Component<ColorsProps, ColorsState> {
  state: ColorsState = {
    currentPage: 1,
    activities: {},
  };

  itemsPerPage = 40;
  sortedColorsCache: LinkColorData[] | null = null;
  prevColors: LinkColorData[] | null = null;

  componentDidMount() {
    if (!this.props.colors.length) this.props.fetchColors();

    let params = new URLSearchParams();
    if (this.props.router) {
      const {location} = this.props.router;
      params = new URLSearchParams(location.search);
    }
    const page = params.get("page");
    const sessionPage = sessionStorage.getItem("currentPage");

    this.setActivities();

    if (page) {
      this.setState({currentPage: Number(page)});
    }
    if (sessionPage) {
      this.setState({currentPage: Number(sessionPage)});
    }
  }

  componentDidUpdate(prevProps: WithRouterProps, prevState: ColorsState) {
    if (this.props.router && prevProps.router) {
      if (
        this.props.router.location.search !== prevProps.router.location.search
      ) {
        const params = new URLSearchParams(this.props.router.location.search);
        const page = params.get("page");
        if (page) {
          this.setState({currentPage: Number(page)});
        }
      }
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.setActivities();
    }
  }

  shouldComponentUpdate(nextProps: PropsFromRedux, nextState: ColorsState) {
    return (
      this.props.colors !== nextProps.colors ||
      this.state.currentPage !== nextState.currentPage
    );
  }

  setActivities = () => {
    const allSessionStorage = getAllSessionStorage();

    if (allSessionStorage) {
      this.setState({activities: allSessionStorage});
    }
  };

  componentWillUnmount() {
    if (this.state.currentPage) {
      sessionStorage.setItem("currentPage", String(this.state.currentPage));
    }
  }

  handlePageChange = (pageNumber: number) => {
    if (this.props.router) {
      const {navigate, location} = this.props.router;
      const params = new URLSearchParams();
      params.append("page", String(pageNumber));
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
      this.setState({currentPage: pageNumber});
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
    const {currentPage} = this.state;
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return sortedColors.slice(startIndex, endIndex);
  };

  render() {
    const {colors, isLoading, error} = this.props;
    const {currentPage, activities} = this.state;
    const sortedColors = this.getSortedColors(colors);
    const paginatedColors = this.getPaginatedColors(sortedColors);

    return error ? (
      <Txt text={error} className="colors-error"/>
    ) : isLoading ? (
      <MainLoader/>
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
  colors: state.JSONPlaceholder.colors,
  isLoading: state.JSONPlaceholder.isLoading,
  error: state.JSONPlaceholder.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchColors: () => dispatch(fetchColors()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withRouter(Colors));
