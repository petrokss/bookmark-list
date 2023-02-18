import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import 'jest-localstorage-mock';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const keyName = 'bookmmarks';

  it('should return an empty array when local storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(keyName, []));
    expect(result.current[0]).toEqual([]);
  });

  it('should persist updates to local storage', () => {
    const { result } = renderHook(() =>
      useLocalStorage<Array<string>>(keyName, [])
    );
    act(() => {
      result.current[1](['google.com', 'translate.com']);
    });
    const storedValue = JSON.parse(localStorage.getItem(keyName) || '');
    expect(storedValue).toEqual(['google.com', 'translate.com']);
  });
});
