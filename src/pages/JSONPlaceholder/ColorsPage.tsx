import React, { memo, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Color, ColorLink } from "./ColorLink";
import { Title } from "../../components/common/InfoText/Title";
import {getAllSessionStorage} from "../../services/sessionStorage/getAllSessionStorage";

interface ColorsPageProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  paginatedColors: Color[];
  handlePageChange: (pageNumber: number) => void;
}

export const ColorsPage: React.FC<ColorsPageProps> = memo(
  ({
    totalItems,
    currentPage,
    itemsPerPage,
    paginatedColors,
    handlePageChange,
  }) => {
    const [activities, setActivities] = useState({});

    const colors = paginatedColors.map((color) => (
      <ColorLink
        key={color.id}
        color={color}
        id={color.id}
        activities={activities}
      />
    ));

    useEffect(() => {
      const allSessionStorage = getAllSessionStorage();
      setActivities(allSessionStorage);
    }, []);

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
