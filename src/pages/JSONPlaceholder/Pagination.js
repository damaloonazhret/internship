import { memo } from "react";
import { Text } from "../../components/common/InfoText/Text";
import { Button } from "../../components/common/Button";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPages = 2;
    const endPages = 2;
    const surroundingPages = 2;

    pageNumbers.push(1);

    const startPage = Math.max(currentPage - surroundingPages, 2);
    const endPage = Math.min(currentPage + surroundingPages, totalPages - 1);

    if (startPage > startPages) {
      pageNumbers.push("start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - endPages) {
      pageNumbers.push("end");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pages = generatePageNumbers();

  return (
    <div className="pagination-buttons">
      {pages.map((page, index) =>
        page === "start" || page === "end" ? (
          <Text key={page + index} text="..." />
        ) : (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            children={page}
          />
        ),
      )}
    </div>
  );
};
export default memo(Pagination);
