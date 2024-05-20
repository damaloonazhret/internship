import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";
import { rgbToHsl } from "../../services/colors/rgbToHsl";
import { hexToRgb } from "../../services/colors/hexToRgb";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { extractColorFromUrl } from "../../services/colors/extractColorFromUrl";
import { Title } from "../../components/common/InfoText/Title";
import { ColorLink } from "./ColorLink";

const ColorsPage = () => {
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLink, setActiveLink] = useState(null);
  const itemsPerPage = 10;
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
      .then((data) => setColors(data))
      .catch((error) => console.error("Error fetching colors:", error));
  }, []);

  const sortedColors = useMemo(() => {
    if (!colors) return [];

    return colors.slice().sort((a, b) => {
      const colorF = extractColorFromUrl(a.thumbnailUrl);
      const colorL = extractColorFromUrl(b.thumbnailUrl);

      const hslF = rgbToHsl(hexToRgb(colorF));
      const hslL = rgbToHsl(hexToRgb(colorL));

      if (hslF[0] !== hslL[0]) return hslF[0] - hslL[0];
      if (hslF[1] !== hslL[1]) return hslF[1] - hslL[1];
      return hslF[2] - hslL[2];
    });
  }, [colors]);

  const paginatedColors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedColors.slice(startIndex, endIndex);
  }, [currentPage, sortedColors]);

  const handlePageChange = useCallback((pageNumber) => {
    const params = new URLSearchParams();
    params.append("page", pageNumber);
    history.push({
      pathname: pathname,
      search: params.toString(),
    });
    setCurrentPage(pageNumber);
  }, [history, pathname]);

  const handleMoreInfoClick = (e, id) => {
    e.preventDefault();
    id === activeLink ? setActiveLink("") : setActiveLink(id);
  };

  return (
    <div className="colors-page">
      <Title title="Colors" type="h1" />
      <ul className="colors">
        {paginatedColors.map((color) => (
          <ColorLink
            key={color.id}
            onClick={(e) => handleMoreInfoClick(e, color.id)}
            color={color}
            isActive={activeLink === color.id}
          />
        ))}
      </ul>
      <Pagination
        totalItems={colors.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ColorsPage;
