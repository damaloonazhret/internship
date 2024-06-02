import { useCallback, useEffect, useMemo, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";
import {LinkColorData} from "../ColorsCC/ColorsCC";
import "../index.scss";

const ColorsFC = () => {
  const [colors, setColors] = useState<LinkColorData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 40;
  const navigate = useNavigate();
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
      .then((data: LinkColorData[]) => {
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
        params.append("page", String(pageNumber));
        navigate({
          pathname: pathname,
          search: params.toString(),
        });
        setCurrentPage(pageNumber);
      },
      [navigate, pathname],
  );

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <ColorsPage
      totalItems={colors.length}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      paginatedColors={paginatedColors}
      handlePageChange={handlePageChange}
    />
  );
};

export default ColorsFC;
