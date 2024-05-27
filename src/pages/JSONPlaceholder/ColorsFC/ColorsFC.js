import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { ColorsPage } from "../ColorsPage";
import "../index.scss";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";

const ColorsFC = () => {
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLink, setActiveLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 40;
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos/")
      .then((response) => response.json())
      .then((data) => {
        setColors(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching colors:", error));
  }, []);

  const sortedColors = useMemo(() => {
    if (!colors) return [];
    return sortColors(colors);
  }, [colors]);

  const paginatedColors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedColors.slice(startIndex, endIndex);
  }, [currentPage, sortedColors]);

  const handlePageChange = useCallback(
    (pageNumber) => {
      const params = new URLSearchParams();
      params.append("page", pageNumber);
      history.push({
        pathname: pathname,
        search: params.toString(),
      });
      setCurrentPage(pageNumber);
    },
    [history, pathname],
  );

  const toggleLink = (e, id) => {
    e.preventDefault();
    id === activeLink ? setActiveLink("") : setActiveLink(id);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <ColorsPage
      totalItems={colors.length}
      activeLink={activeLink}
      toggleLink={toggleLink}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      paginatedColors={paginatedColors}
      handlePageChange={handlePageChange}
    />
  );
};

export default ColorsFC;
