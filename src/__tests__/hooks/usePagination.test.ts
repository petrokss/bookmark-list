import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { usePagination } from "../../hooks/usePagination";

describe("usePagination", () => {
  const itemsPerPage = 2;
  const totalItems = 5;
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i,
    title: `Bookmark ${i}`,
    url: `https://example.com/${i}`,
  }));

  it("should initialize with current page 1", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    expect(result.current.currentPage).toEqual(1);
  });

  it("should go to the next page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    act(() => {
      result.current.goToNextPage();
    });
    expect(result.current.currentPage).toEqual(2);
  });

  it("should not go to the next page if already on the last page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, itemsPerPage)
    );
    act(() => {
      result.current.goToNextPage();
    });
    expect(result.current.currentPage).toEqual(1);
  });

  it("should go to the previous page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    act(() => {
      result.current.goToNextPage();
    });
    act(() => {
      result.current.goToPrevPage();
    });

    expect(result.current.currentPage).toEqual(1);
  });

  it("should not go to the previous page if already on the first page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, itemsPerPage)
    );
    act(() => {
      result.current.goToPrevPage();
    });
    expect(result.current.currentPage).toEqual(1);
  });

  it("should go to the specified page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    act(() => {
      result.current.goToPage(2);
    });

    expect(result.current.currentPage).toEqual(2);
  });

  it("should get the pagination range when current page is 1", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    expect(result.current.getPaginationRange()).toEqual([1, 2, 3]);
  });

  it("should get the paginated items when on first page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    let paginatedItems;
    act(() => {
      paginatedItems = result.current.getPaginatedItems(items);
    });
    expect(paginatedItems).toEqual(items.slice(0, 2));
  });

  it("should get the paginated items when on middle page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, totalItems)
    );
    let paginatedItems;
    act(() => {
      result.current.goToPage(2);
    });
    act(() => {
      paginatedItems = result.current.getPaginatedItems(items);
    });
    expect(paginatedItems).toEqual(items.slice(2, 4));
  });

  it("should get the paginated items when on last page", () => {
    const { result } = renderHook(() =>
      usePagination(itemsPerPage, itemsPerPage)
    );
    let paginatedItems;
    act(() => {
      result.current.goToPage(3);
    });
    act(() => {
      paginatedItems = result.current.getPaginatedItems(items);
    });
    expect(paginatedItems).toEqual(items.slice(4, 5));
  });
});
