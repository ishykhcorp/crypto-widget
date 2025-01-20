import { useCallback, useState } from 'react';

export function useArray<T>() {
  const [items, setItems] = useState<T[]>([]);

  const pushItem = useCallback((item: T): void => {
    setItems((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((item: T): void => {
    setItems((prev) => prev.filter((prevItem: T) => prevItem !== item));
  }, []);

  return {
    items,
    pushItem,
    removeItem,
  };
}
