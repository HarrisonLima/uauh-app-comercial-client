const useLocalStorage = () => {
  const ADD_LocalStorage = (key: string, value: string) => {
    if (value !== undefined && value !== "") {
      return localStorage.setItem(key, value);
    }
  };

  const GET_LocalStorage = (key: string): string | null => {
    const item = localStorage.getItem(key);
    return item;
  };

  const REMOVE_LocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    ADD_LocalStorage,
    GET_LocalStorage,
    REMOVE_LocalStorage,
  };
};

export default useLocalStorage;
