import { useState, ErrorInfo } from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkList from './components/BookmarkList';
import ErrorBoundary from './components/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Bookmark } from './types';
import styles from './App.module.css';

function App() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>(
    'bookmarks',
    []
  );

  const [error, setError] = useState('');

  const handleDeleteBookmark = (id: number) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleClearBookmarks = () => {
    setBookmarks([]);
  };

  const handleAddBookmark = (url: string, title: string) => {
    const newBookmark = {
      id: Date.now(),
      title,
      url,
    };
    setBookmarks([...bookmarks, newBookmark]);
    setError('');
  };

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error(error);
  };

  return (
    <ErrorBoundary onError={handleError}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h1>Bookmarks manager</h1>
          <BookmarkForm
            onAddBookmark={handleAddBookmark}
            error={error}
            setError={setError}
          />
        </div>
        <BookmarkList
          className={styles.column}
          bookmarks={bookmarks}
          onDeleteBookmark={handleDeleteBookmark}
          onClearBookmarks={handleClearBookmarks}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
