export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return null;
  } catch (error) {
    return 'Invalid URL';
  }
};
