import { describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import { renderHook } from "@testing-library/react";

import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import * as utils from "../../utils/utils";
import { mockLocalStorage, mockNavigatorGeolocation } from "@/testutils";
import { SunriseSunsetApiResponse } from "@/utils/interfaces";
import { after, before } from "node:test";
import { SpiedFunction, FunctionLike } from "jest-mock";

// Source - https://stackoverflow.com/a/76655549
// Posted by Benjamin Rae
// Retrieved 2026-06-13, License - CC BY-SA 4.0

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

Object.defineProperty(navigator, "geolocation", {
  value: mockNavigatorGeolocation,
});

jest.mock("../../utils/utils.ts", () => {
    return {
    __esModule: true,
    ...jest.requireActual<typeof utils>('../../utils/utils.ts'),
    isNewDay: (sunriseTimestamp: string) => new Date(sunriseTimestamp) >= new Date("2026-06-14T05:29:57-04:00"),
  };
});

describe("useSunriseAndSunset hook", () => {
    // Philly coordinates
    const latitude = 39.9526;
    const longitude = -75.1652;
    const tzid = "America/New_York";

    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0&tzid=${tzid}`

    test("it should call the Sunset/Sunrise API if localStorage is empty", () => {
      const sunriseTimestamp = "2026-06-13T05:29:57-04:00";
      const sunsetTimestamp = "2026-06-13T20:32:02-04:00";
      const status = "OK";

      const apiMock = jest
        .spyOn(axios, 'get')
        .mockImplementation((url: string) => (
          Promise.resolve({
            data: {
              results: {
                sunrise: "2026-06-13T05:29:57-04:00",
                sunset: "2026-06-13T20:32:02-04:00"
              },
              status,
            }
          })
        ));

      const { result } = renderHook(() => useSunriseAndSunset());
      
      expect(apiMock.mock.calls.length).toBeGreaterThanOrEqual(1);
      expect(apiMock.mock.calls[0][0]).toBe(apiUrl);

      expect(result.current.sunriseTimestamp).toEqual(sunriseTimestamp);
      expect(result.current.sunsetTimestamp).toEqual(sunsetTimestamp);

      apiMock.mockRestore();
    });

    test("it should return the sunriseTimestamp and sunsetTimestamp in localStorage if timestamps and timezone are set, and is still same day", () => {
        const sunriseTimestamp = "2026-06-13T05:29:57-04:00";
        const sunsetTimestamp = "2026-06-13T20:32:02-04:00";
        const tzid = "America/New_York";

        localStorage.setItem("sunriseTimestamp", sunriseTimestamp);
        localStorage.setItem("sunsetTimestamp", sunsetTimestamp);
        localStorage.setItem("tzid", tzid);

        const { result } = renderHook(useSunriseAndSunset);

        console.log(result.current);
        expect(result.current.sunriseTimestamp).toEqual(sunriseTimestamp);
        expect(result.current.sunsetTimestamp).toEqual(sunsetTimestamp);
    });
})
