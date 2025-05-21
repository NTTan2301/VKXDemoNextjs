import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State local trong component, khởi tạo từ localStorage hoặc initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      // SSR: trả về initialValue tạm thời
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn("Lỗi khi lấy dữ liệu localStorage:", error);
      return initialValue;
    }
  });

  // Hàm lưu giá trị mới vào cả state và localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn("Lỗi khi lưu dữ liệu localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
}
