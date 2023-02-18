import { useState } from 'react';
import classnames from 'classnames';
import { validateUrl } from '../../utils/validateUrl';
import styles from './BookmarkForm.module.css';

type BookmarkFormProps = {
  onAddBookmark: (url: string, title: string) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const BookmarkForm = ({
  onAddBookmark,
  error,
  setError,
  className = '',
}: BookmarkFormProps) => {
  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setUrl(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setTitle(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !url) {
      setError('Please fill in all fields');
      return;
    }
    const urlError = validateUrl(url);
    if (urlError) {
      setError(urlError);
      return;
    }

    onAddBookmark(url, title);
    setUrl('');
    setTitle('');
  };

  return (
    <form className={classnames(className)} onSubmit={handleSubmit}>
      <div className={styles['form-input']}>
        <input
          className={styles.input}
          placeholder="Title"
          type="text"
          id="title-input"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          className={styles.input}
          placeholder="URL"
          type="text"
          id="url-input"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      {error && <p className={styles['error-message']}>{error}</p>}
      <button
        className={classnames(styles.button, styles['add-bookmark'])}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default BookmarkForm;
