import React, { MouseEvent } from "react";
import Pagination from "./Pagination";
import { Color, ColorLink } from "./ColorLink";
import { Title } from "../../components/common/InfoText/Title";

interface ColorsPageProps {
  totalItems: number;
  activeLink: number | null;
  toggleLink: (e: MouseEvent<HTMLAnchorElement>, id: number) => void;
  currentPage: number;
  itemsPerPage: number;
  paginatedColors: Color[];
  handlePageChange: (pageNumber: number) => void;
}

export const ColorsPage: React.FC<ColorsPageProps> = ({
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
            onClick={(e: MouseEvent<HTMLAnchorElement>) =>
              toggleLink(e, color.id)
            }
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
