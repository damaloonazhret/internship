import { Component, createRef } from "react";
import { rgbToHsl } from "../../../services/colors/rgbToHsl";
import { hexToRgb } from "../../../services/colors/hexToRgb";
import { withRouter } from "react-router-dom";
import { extractColorFromUrl } from "../../../services/colors/extractColorFromUrl";
import { ColorsPage } from "../ColorsPage";
import "../index.scss";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";

class ColorsCC extends Component {
  state = {
    colors: [],
    currentPage: 1,
    activeLink: null,
    isLoading: true,
  };

  itemsPerPage = 40;
  linkRef = createRef();
  sortedColorsCache = null;
  prevColors = null;

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      const page = params.get("page");
      if (page) {
        this.setState({ currentPage: Number(page) });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.state.colors !== nextState.colors ||
      this.state.currentPage !== nextState.currentPage ||
      this.state.activeLink !== nextState.activeLink
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.activeLink !== this.state.activeLink) {
      this.linkRef.current = this.state.activeLink;
      return this.linkRef.current;
    }
    return null;
  }

  componentWillUnmount() {
    if (this.state.currentPage) {
      sessionStorage.setItem("currentPage", this.state.currentPage);
    }
    if (this.linkRef.current) {
      sessionStorage.setItem("activeLink", this.linkRef.current);
    }
  }

  handlePageChange = (pageNumber) => {
    const { history, location } = this.props;
    const params = new URLSearchParams();
    params.append("page", pageNumber);
    history.push({
      pathname: location.pathname,
      search: params.toString(),
    });
    this.setState({ currentPage: pageNumber });
  };

  handleMoreInfoClick = (e, id) => {
    e.preventDefault();
    this.setState((prevState) => ({
      activeLink: prevState.activeLink === id ? null : id,
    }));
  };

  getSortedColors = (colors) => {
    if (colors === this.prevColors) {
      return this.sortedColorsCache;
    }

    this.sortedColorsCache = colors.slice().sort((a, b) => {
      const colorF = extractColorFromUrl(a.thumbnailUrl);
      const colorL = extractColorFromUrl(b.thumbnailUrl);

      const hslF = rgbToHsl(hexToRgb(colorF));
      const hslL = rgbToHsl(hexToRgb(colorL));

      if (hslF[0] !== hslL[0]) return hslF[0] - hslL[0];
      if (hslF[1] !== hslL[1]) return hslF[1] - hslL[1];
      return hslF[2] - hslL[2];
    });

    this.prevColors = colors;
    return this.sortedColorsCache;
  };

  getPaginatedColors = (sortedColors) => {
    const { currentPage } = this.state;
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return sortedColors.slice(startIndex, endIndex);
  };

  render() {
    const { colors, currentPage, activeLink } = this.state;
    const sortedColors = this.getSortedColors(colors);
    const paginatedColors = this.getPaginatedColors(sortedColors);

    return this.state.isLoading ? (
      <MainLoader />
    ) : (
      <ColorsPage
        paginatedColors={paginatedColors}
        activeLink={activeLink}
        colors={colors}
        itemsPerPage={this.itemsPerPage}
        currentPage={currentPage}
        handlePageChange={this.handlePageChange}
        handleMoreInfoClick={this.handleMoreInfoClick}
      />
    );
  }
}

export default withRouter(ColorsCC);
