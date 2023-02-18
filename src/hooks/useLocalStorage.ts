import { useState, useEffect } from 'react';

const safeExtract = <T>(keyName: string, defaultValue: T) => {
  try {
    const item = localStorage.getItem(keyName);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(safeExtract(keyName, defaultValue));

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
};
