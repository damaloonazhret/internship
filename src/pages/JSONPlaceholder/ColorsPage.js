import Pagination from "./Pagination";
import { ColorLink } from "./ColorLink";
import { Title } from "../../components/common/InfoText/Title";

export const ColorsPage = ({
  totalItems,
  activeLink,
  toggleLink,
  currentPage,
  itemsPerPage,
  paginatedColors,
  handlePageChange,
}) => {
  return (
    <div className="colors-page">
      <Title title="Colors" type="h1" />
      <ul className="colors">
        {paginatedColors.map((color) => (
          <ColorLink
            key={color.id}
            onClick={(e) => toggleLink(e, color.id)}
            color={color}
            isActive={activeLink === color.id}
          />
        ))}
      </ul>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
