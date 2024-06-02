import React, { Component, ComponentType } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";
import { getAllSessionStorage } from "../../../services/sessionStorage/getAllSessionStorage";
import "../index.scss";

export interface RouterProps {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
}

export interface WithRouterProps {
  router?: RouterProps;
}

export function withRouter<T>(Component: ComponentType<T & WithRouterProps>) {
  function ComponentWithRouterProp(props: T) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export interface LinkColorData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ColorsCCState {
  colors: LinkColorData[];
  currentPage: number;
  isLoading: boolean;
  activities: { [key: string]: string };
}

class ColorsCC extends Component<WithRouterProps, ColorsCCState> {
  state: ColorsCCState = {
    colors: [],
    currentPage: 1,
    isLoading: true,
    activities: {},
  };

  itemsPerPage = 40;
  sortedColorsCache: LinkColorData[] | null = null;
  prevColors: LinkColorData[] | null = null;

  componentDidMount() {
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
    fetch("https://jsonplaceholder.typicode.com/photos/")
      .then((response) => response.json())
      .then((data) => this.setState({ colors: data, isLoading: false }))
      .catch((error) => console.error("Error fetching colors:", error));
  }

  componentDidUpdate(
    prevProps: WithRouterProps,
    prevState: ColorsCCState,
    snapshot: number | null,
  ) {
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

  shouldComponentUpdate(nextProps: WithRouterProps, nextState: ColorsCCState) {
    return (
      this.state.colors !== nextState.colors ||
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
    const { colors, currentPage, isLoading } = this.state;
    const sortedColors = this.getSortedColors(colors);
    const paginatedColors = this.getPaginatedColors(sortedColors);

    return isLoading ? (
      <MainLoader />
    ) : (
      <ColorsPage
        totalItems={colors.length}
        currentPage={currentPage}
        activities={this.state.activities}
        itemsPerPage={this.itemsPerPage}
        paginatedColors={paginatedColors}
        handlePageChange={this.handlePageChange}
      />
    );
  }
}

export default withRouter(ColorsCC);
