import classnames from 'classnames';
import { usePagination } from '../../hooks/usePagination';
import { ELEMENTS_PER_PAGE } from '../../consts';
import type { Bookmark } from '../../types';
import styles from './BookmarkList.module.css';

type BookmarkListProps = {
  bookmarks: Bookmark[];
  onDeleteBookmark: (id: number) => void;
  onClearBookmarks: () => void;
  className?: string;
};

const BookmarkList = ({
  bookmarks,
  onDeleteBookmark,
  onClearBookmarks,
  className = '',
}: BookmarkListProps) => {
  const {
    currentPage,
    totalPages,
    goToPage,
    goToPrevPage,
    goToNextPage,
    getPaginationRange,
    getPaginatedItems,
  } = usePagination(ELEMENTS_PER_PAGE, bookmarks.length);

  const paginatedBookmarks = getPaginatedItems(bookmarks);
  const paginationRange = getPaginationRange();

  const handleDeleteBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    onDeleteBookmark(id);
  };

  return (
    <div className={classnames(className)}>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found.</p>
      ) : (
        <>
          <div className={styles['list-button-group']}>
            <div className={styles.pagination}>
              <button
                className={styles.button}
                disabled={currentPage === 1}
                onClick={goToPrevPage}
              >
                &lt;
              </button>
              {paginationRange.map((pageNumber) => (
                <button
                  className={styles.button}
                  key={pageNumber}
                  disabled={pageNumber === currentPage}
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                className={styles.button}
                disabled={currentPage === totalPages}
                onClick={() => goToNextPage()}
              >
                &gt;
              </button>
            </div>
            <button className={styles.button} onClick={onClearBookmarks}>
              Clear All
            </button>
          </div>
          <div>
            <ul className={styles.list}>
              {paginatedBookmarks.map((bookmark) => (
                <li key={bookmark.id} className={styles.item}>
                  <a
                    className={styles.url}
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {bookmark.title}
                  </a>
                  <button
                    className={styles['delete-button']}
                    onClick={(e) => handleDeleteBookmark(e, bookmark.id)}
                  >
                    &#10006;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarkList;
