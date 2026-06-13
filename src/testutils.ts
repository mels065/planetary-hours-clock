// Source - https://stackoverflow.com/a/76655549
// Posted by Benjamin Rae
// Retrieved 2026-06-13, License - CC BY-SA 4.0

const mockLocalStorage = (() => {
  let store = {} as Storage;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    removeItem(key: string) {
      delete store[key];
    },

    clear() {
      store = {} as Storage;
    },
  };
})();

export default mockLocalStorage;
