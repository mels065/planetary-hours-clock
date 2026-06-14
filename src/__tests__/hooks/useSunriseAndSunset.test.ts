import { describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import { renderHook } from "@testing-library/react";

import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import * as utils from "../../utils/utils";
import mockLocalStorage from "@/testutils";
import { SunriseSunsetApiResponse } from "@/utils/interfaces";
import { before } from "node:test";

// Source - https://stackoverflow.com/a/76655549
// Posted by Benjamin Rae
// Retrieved 2026-06-13, License - CC BY-SA 4.0

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

jest.mock("../../utils/utils.ts", () => {
    return {
    __esModule: true,
    ...jest.requireActual<typeof utils>('../../utils/utils.ts'),
    isNewDay: (sunriseTimestamp: string) => new Date(sunriseTimestamp) >= new Date("2026-06-14T05:29:57-04:00"),
  };
});

describe("useSunriseAndSunset hook", () => {
    let geolocationMock;
    before(() => {
      geolocationMock = jest
        .spyOn(navigator.geolocation, 'getCurrentPosition')
        // .mockImplementation()
    })

    test("it should call the Sunset/Sunrise API if localStorage is empty", () => {
      const sunrise = "2026-06-13T05:29:57-04:00";
      const sunset = "2026-06-13T20:32:02-04:00";
      const tzid = "America/New_York";
      const status = "OK";

      const apiUrl = ``

      const apiMock = jest
        .spyOn(axios, 'get')
        .mockImplementation((url: string) => (
          Promise.resolve({
            data: {
              results: {
                sunrise: "2026-06-13T05:29:57-04:00",
                sunset: "2026-06-13T20:32:02-04:00"
              },
              status: "OK"
            }
          })
        ));

      const { result } = renderHook(() => useSunriseAndSunset());
      
      expect(apiMock.mock.calls.length).toBeGreaterThanOrEqual(1);
      // expect(apiMock.mock.calls[0][0]).toBe()

      apiMock.mockRestore();
    });

    test("it should return the sunriseTimestamp and sunsetTimestamp in localStorage if timestamps and timezone are set, and is still same day", () => {
        const sunriseTimestamp = "2026-06-13T05:29:57-04:00";
        const sunsetTimestamp = "2026-06-13T20:32:02-04:00";
        const tzid = "America/New_York";

        localStorage.setItem("sunriseTimestamp", sunriseTimestamp);
        localStorage.setItem("sunsetTimestamp", sunsetTimestamp);
        localStorage.setItem("tzid", tzid);

        const { result } = renderHook(() => useSunriseAndSunset());

        expect(result.current.sunriseTimestamp).toEqual(sunriseTimestamp);
        expect(result.current.sunsetTimestamp).toEqual(sunsetTimestamp);
    });
})
