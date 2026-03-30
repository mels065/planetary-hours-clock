import { describe, expect, test } from "@jest/globals";
import { calculateDaytimeAndNighttimeHourLengths } from "@/utils/utils";

import { HourLengths } from "@/utils/interfaces";

describe('calculateDaytimeAndNighttimeHourLengths function', () => {
    test('check that calculates appropriate day and night hour lengths', () => {
        const sunriseTime = new Date("March 25, 2026 06:55:00");
        const sunsetTime = new Date("March 25, 2026 19:17:00");

        expect(calculateDaytimeAndNighttimeHourLengths(sunriseTime, sunsetTime)).toEqual({
            daytimeHourTime: 61.833333333333336,
            nighttimeHourTime: 58.166666666666664
        } as HourLengths);
    });
});
