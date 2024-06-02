import { FC, memo } from "react";
import Pagination from "./Pagination";
import { ColorLink } from "./ColorLink";
import { Title } from "../../components/common/InfoText/Title";
import {LinkColorData} from "./ColorsCC/ColorsCC";

interface ColorsPageProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  paginatedColors: LinkColorData[];
  handlePageChange: (pageNumber: number) => void;
  activities?: { [key: string]: string };
}

export const ColorsPage: FC<ColorsPageProps> = memo(
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
