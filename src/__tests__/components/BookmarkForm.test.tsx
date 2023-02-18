import { render, screen, fireEvent } from '@testing-library/react';
import BookmarkForm from '../../components/BookmarkForm';
import '@testing-library/jest-dom';

describe('BookmarkForm component', () => {
  const onAddBookmark = jest.fn();
  const setError = jest.fn();

  it('should render form elements correctly', () => {
    render(
      <BookmarkForm
        onAddBookmark={onAddBookmark}
        error=""
        setError={setError}
      />
    );

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('URL')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('should show error message when form fields are empty', () => {
    render(
      <BookmarkForm
        onAddBookmark={onAddBookmark}
        error=""
        setError={setError}
      />
    );

    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(button);

    expect(setError).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should show error message when URL is invalid', () => {
    render(
      <BookmarkForm
        onAddBookmark={onAddBookmark}
        error=""
        setError={setError}
      />
    );

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Bookmark' } });

    const urlInput = screen.getByPlaceholderText('URL');
    fireEvent.change(urlInput, { target: { value: 'invalidurl' } });

    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(button);

    expect(setError).toHaveBeenCalledWith('Invalid URL');
  });

  it('should call onAddBookmark when form is submitted with valid data', () => {
    render(
      <BookmarkForm
        onAddBookmark={onAddBookmark}
        error=""
        setError={setError}
      />
    );

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'My Bookmark' } });

    const urlInput = screen.getByPlaceholderText('URL');
    fireEvent.change(urlInput, {
      target: { value: 'https://www.example.com' },
    });

    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(button);

    expect(onAddBookmark).toHaveBeenCalledWith(
      'https://www.example.com',
      'My Bookmark'
    );
    expect(titleInput).toHaveValue('');
    expect(urlInput).toHaveValue('');
  });
});
