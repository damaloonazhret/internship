import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorsPage } from "../ColorsPage";
import { MainLoader } from "../../../components/common/Loaders/MainLoader";
import { sortColors } from "../../../services/colors/sortColors";
import "../index.scss";
import { Text } from "../../../components/common/InfoText/Text";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../services/hooks/redux/redux";
import { fetchColorsFC } from "../../../store/colors/colorsThunks";

const ColorsFC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 40;
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useAppDispatch();
  const { colors, isLoading, error } = useAppSelector(
    (state) => state.colorsFC,
  );

  useEffect(() => {
    dispatch(fetchColorsFC());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location]);

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

  return isLoading ? (
    <MainLoader />
  ) : error ? (
    <Text text={error} className="colors-error"></Text>
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
