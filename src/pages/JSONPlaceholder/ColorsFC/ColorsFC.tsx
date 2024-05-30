import { useCallback, useEffect, useMemo, useState, MouseEvent } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";
import { Color } from "../ColorLink";
import "../index.scss";

const ColorsFC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      .then((data: Color[]) => {
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
    (pageNumber: number) => {
      const params = new URLSearchParams();
      params.append("page", pageNumber.toString());
      history.push({
        pathname: pathname,
        search: params.toString(),
      });
      setCurrentPage(pageNumber);
    },
    [history, pathname],
  );

  const toggleLink = (e: MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    setActiveLink(id === activeLink ? null : id);
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
