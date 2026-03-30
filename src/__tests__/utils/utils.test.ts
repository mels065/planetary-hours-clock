import { describe, expect, test } from "@jest/globals";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryDaytimeHours, getNumOfPlanets } from "@/utils/utils";

import { DAYS_OF_WEEK, NUM_OF_PLANETARY_HOURS } from "@/utils/constants";
import { Planet } from "@/utils/enums";
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

    test('expect the first hour to match the planetary day, and to increment and wrap around again from there (i.e. if Mercury is first day, then the Moon is next, and then Saturn, etc.', () => {
        let { planet } = DAYS_OF_WEEK[currentDate.getDay()];
        const daytimeHours = generatePlanetaryDaytimeHours(currentDate, daytimeHourTime);
        
        expect.assertions(NUM_OF_PLANETARY_HOURS);

        for (const { planet: p } of daytimeHours) {
            expect(Planet[p]).toEqual(Planet[planet]);
            planet = (planet + 1) % getNumOfPlanets();
        }
    });

    test('startTime should be less than endTime for all given hours', () => {
        const daytimeHours = generatePlanetaryDaytimeHours(currentDate, daytimeHourTime);

        expect.assertions(NUM_OF_PLANETARY_HOURS);

        for (const { startTime, endTime } of daytimeHours) {
            expect(startTime.getTime()).toBeLessThan(endTime.getTime());
        }
    });

    test('endTime of previous hour should match startTime of next hour', () => {
        const daytimeHours = generatePlanetaryDaytimeHours(currentDate, daytimeHourTime);

        expect.assertions(NUM_OF_PLANETARY_HOURS - 1);

        for (let i = 0; i < daytimeHours.length - 1; i++) {
            const currentHour = daytimeHours[i];
            const nextHour = daytimeHours[i+1];

            expect(currentHour.endTime.getTime()).toEqual(nextHour.startTime.getTime());
        }
    })
});
