import { useState } from "react";
import type { Bookmark } from "../types";

export const usePagination = (itemsPerPage = 20, totalItems: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPaginationRange = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 2, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getPaginatedItems = (items: Bookmark[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    goToPrevPage,
    goToNextPage,
    getPaginationRange,
    getPaginatedItems,
  };
};

export default usePagination;
