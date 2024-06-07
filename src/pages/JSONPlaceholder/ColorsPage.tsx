import { FC, memo } from "react";
import Pagination, {PaginationProps} from "./Pagination";
import { ColorLink } from "./ColorLink";
import { Title } from "../../components/common/InfoText/Title";
import {LinkColorData, UserSelectedColors} from "./ColorsCC/ColorsCC";

interface ColorsPageProps extends PaginationProps{
  paginatedColors: LinkColorData[];
  activities?: UserSelectedColors ;
}

export const ColorsPage: FC<ColorsPageProps> = memo(
  ({
    totalItems,
    currentPage,
    itemsPerPage,
    paginatedColors,
    onPageChange,
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
          onPageChange={onPageChange}
        />
      </div>
    );
  },
);
