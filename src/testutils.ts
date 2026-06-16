// Source - https://stackoverflow.com/a/76655549
// Posted by Benjamin Rae
// Retrieved 2026-06-13, License - CC BY-SA 4.0

export const mockLatitude = 39.9526;
export const mockLongitude = -75.1652;
export const mockTzid = "America/New_York";

export const mockLocalStorage = (() => {
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

export const mockNavigatorGeolocation = {
  getCurrentPosition: (cb: (position: GeolocationPosition) => void) => {
    const mockPosition = {
      coords: {
        longitude: mockLongitude,
        latitude: mockLatitude,
      }
    } as GeolocationPosition;
    cb(mockPosition);
  }
};
