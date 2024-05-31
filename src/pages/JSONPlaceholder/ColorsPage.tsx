import React, { memo } from "react";
import Pagination from "./Pagination";
import { Color, ColorLink } from "./ColorLink";
import { Title } from "../../components/common/InfoText/Title";

interface ColorsPageProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  paginatedColors: Color[];
  handlePageChange: (pageNumber: number) => void;
  activities?: { [key: string]: string };
}

export const ColorsPage: React.FC<ColorsPageProps> = memo(
  ({
    totalItems,
    currentPage,
    itemsPerPage,
    paginatedColors,
    handlePageChange,
    activities,
  }) => {
    const colors = paginatedColors.map((color) => (
      <ColorLink
        key={color.id}
        color={color}
        id={color.id}
        activities={activities ? activities : {}}
      />
    ));

    return (
      <div className="colors-page">
        <Title title="Colors" type="h1" />
        <ul className="colors">{colors}</ul>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  },
);
