import { describe, expect, test } from "@jest/globals";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryDaytimeHours } from "@/utils/utils";

import { DAYS_OF_WEEK, NUM_OF_PLANETARY_HOURS } from "@/utils/constants";
import { HourLengths } from "@/utils/interfaces";

describe('calculateDaytimeAndNighttimeHourLengths function', () => {
    test('calculates appropriate day and night hour lengths', () => {
        const sunriseTime = new Date("March 25, 2026 06:55:00");
        const sunsetTime = new Date("March 25, 2026 19:17:00");

        expect(calculateDaytimeAndNighttimeHourLengths(sunriseTime, sunsetTime)).toEqual({
            daytimeHourTime: 61.833333333333336,
            nighttimeHourTime: 58.166666666666664
        } as HourLengths);
    });
});

describe('generatePlanetaryDaytimeHours function', () => {
    const currentDate = new Date("March 25, 2026 06:55:00");
    const daytimeHourTime = 61.833333333333336;

    test.skip('generates the appropriate timetable given the daytime', () => {
        expect(generatePlanetaryDaytimeHours(currentDate, daytimeHourTime))
    });

    test(`returns an array of exactly ${NUM_OF_PLANETARY_HOURS} planetary hours`, () => {
        expect(generatePlanetaryDaytimeHours(currentDate, daytimeHourTime)).toHaveLength(NUM_OF_PLANETARY_HOURS);
    });

    test('expect the first hour to match the planetary day', () => {
        const { planet } = DAYS_OF_WEEK[currentDate.getDay()];
        expect(generatePlanetaryDaytimeHours(currentDate, daytimeHourTime)[0].planet).toEqual(planet);
    });

    test('startTime should be less than endTime for a given hour', () => {
        const { startTime, endTime } = generatePlanetaryDaytimeHours(currentDate, daytimeHourTime)[0];
        expect(startTime.getTime()).toBeLessThan(endTime.getTime());
    });
});
