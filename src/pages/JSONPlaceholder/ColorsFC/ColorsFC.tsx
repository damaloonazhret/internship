import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";
import { LinkColorData } from "../ColorsCC/ColorsCC";
import "../index.scss";
import { colorsRequest } from "../../../services/api/JSONPlaceholder/api";
import { useAsyncRequest } from "../../../services/hooks/useAsyncRequest";
import { Text } from "../../../components/common/InfoText/Text";

const ColorsFC = () => {
  const [colors, setColors] = useState<LinkColorData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 40;
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { isLoading, error, data, fetchData } =
    useAsyncRequest<LinkColorData[]>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location]);

  useEffect(() => {
    fetchData(colorsRequest);
  }, [fetchData]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setColors(data);
    }
  }, [data]);

  const sortedColors = useMemo(() => {
    if (!Array.isArray(colors) || colors.length === 0) return [];
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

  return error ? (
    <Text
      text={error instanceof Error ? error.message : error}
      className="colors-error"
    ></Text>
  ) : (
    <ColorsPage
      totalItems={colors.length}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      paginatedColors={paginatedColors}
      onPageChange={handlePageChange}
    />
  );
};

export default ColorsFC;
