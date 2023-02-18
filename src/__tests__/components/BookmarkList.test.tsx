import { render, screen, fireEvent } from '@testing-library/react';
import BookmarkList from '../../components/BookmarkList';

const bookmarks = [
  { id: 1, title: 'Bookmark 1', url: 'https://www.example.com/bookmark1' },
  { id: 2, title: 'Bookmark 2', url: 'https://www.example.com/bookmark2' },
  { id: 3, title: 'Bookmark 3', url: 'https://www.example.com/bookmark3' },
];

describe('BookmarkList component', () => {
  test('should render bookmarks', () => {
    render(
      <BookmarkList
        bookmarks={bookmarks}
        onDeleteBookmark={() => {}}
        onClearBookmarks={() => {}}
      />
    );

    const bookmarkLinks = screen.getAllByRole('link');
    expect(bookmarkLinks).toHaveLength(bookmarks.length);
  });

  test('should delete a bookmark', () => {
    const onDeleteBookmark = jest.fn();

    render(
      <BookmarkList
        bookmarks={bookmarks}
        onDeleteBookmark={onDeleteBookmark}
        onClearBookmarks={() => {}}
      />
    );

    const deleteButton = screen.getAllByRole('button', { name: '✖' })[0];
    fireEvent.click(deleteButton);

    expect(onDeleteBookmark).toHaveBeenCalledTimes(1);
    expect(onDeleteBookmark).toHaveBeenCalledWith(1);
  });

  test('should clear all bookmarks', () => {
    const onClearBookmarks = jest.fn();

    render(
      <BookmarkList
        bookmarks={bookmarks}
        onDeleteBookmark={() => {}}
        onClearBookmarks={onClearBookmarks}
      />
    );

    const clearButton = screen.getByRole('button', { name: 'Clear All' });
    fireEvent.click(clearButton);

    expect(onClearBookmarks).toHaveBeenCalledTimes(1);
  });
});
