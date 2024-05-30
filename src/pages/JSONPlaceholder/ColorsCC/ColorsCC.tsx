import React, { Component, createRef, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import "../index.scss";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";

interface Color {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ColorsCCState {
  colors: Color[];
  currentPage: number;
  activeLink: number | null;
  isLoading: boolean;
}

type Props = RouteComponentProps;

class ColorsCC extends Component<Props, ColorsCCState> {
  state: ColorsCCState = {
    colors: [],
    currentPage: 1,
    activeLink: null,
    isLoading: true,
  };

  itemsPerPage = 40;
  linkRef = createRef<HTMLAnchorElement>();
  sortedColorsCache: Color[] | null = null;
  prevColors: Color[] | null = null;

  componentDidMount() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const sessionPage = sessionStorage.getItem("currentPage");
    const activeLink = sessionStorage.getItem("activeLink");

    if (page) {
      this.setState({ currentPage: Number(page) });
    }
    if (sessionPage) {
      this.setState({ currentPage: Number(sessionPage) });
    }
    if (activeLink) {
      this.setState({ activeLink: Number(activeLink) });
    }
    fetch("https://jsonplaceholder.typicode.com/photos/")
      .then((response) => response.json())
      .then((data) => this.setState({ colors: data, isLoading: false }))
      .catch((error) => console.error("Error fetching colors:", error));
  }

  componentDidUpdate(
    prevProps: Props,
    prevState: ColorsCCState,
    snapshot: number | null,
  ) {
    if (this.props.location.search !== prevProps.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      const page = params.get("page");
      if (page) {
        this.setState({ currentPage: Number(page) });
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: ColorsCCState) {
    return (
      this.state.colors !== nextState.colors ||
      this.state.currentPage !== nextState.currentPage ||
      this.state.activeLink !== nextState.activeLink
    );
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: ColorsCCState) {
    if (prevState.activeLink !== this.state.activeLink) {
      return this.state.activeLink;
    }
    return null;
  }

  componentWillUnmount() {
    if (this.state.currentPage) {
      sessionStorage.setItem("currentPage", String(this.state.currentPage));
    }
    if (this.state.activeLink) {
      sessionStorage.setItem("activeLink", String(this.state.activeLink));
    }
  }

  handlePageChange = (pageNumber: number) => {
    const { history, location } = this.props;
    const params = new URLSearchParams();
    params.append("page", String(pageNumber));
    history.push({
      pathname: location.pathname,
      search: params.toString(),
    });
    this.setState({ currentPage: pageNumber });
  };

  getSortedColors = (colors: Color[]): Color[] => {
    if (colors === this.prevColors) {
      return this.sortedColorsCache || [];
    }

    this.sortedColorsCache = sortColors(colors);

    this.prevColors = colors;
    return this.sortedColorsCache;
  };

  getPaginatedColors = (sortedColors: Color[]) => {
    const { currentPage } = this.state;
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return sortedColors.slice(startIndex, endIndex);
  };

  toggleLink = (e: MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    this.setState((prevState) => ({
      activeLink: prevState.activeLink === id ? null : id,
    }));
  };

  render() {
    const { colors, currentPage, activeLink, isLoading } = this.state;
    const sortedColors = this.getSortedColors(colors);
    const paginatedColors = this.getPaginatedColors(sortedColors);

    return isLoading ? (
      <MainLoader />
    ) : (
      <ColorsPage
        totalItems={colors.length}
        activeLink={activeLink}
        toggleLink={this.toggleLink}
        currentPage={currentPage}
        itemsPerPage={this.itemsPerPage}
        paginatedColors={paginatedColors}
        handlePageChange={this.handlePageChange}
      />
    );
  }
}

export default withRouter(ColorsCC);
