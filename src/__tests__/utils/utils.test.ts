import { describe, expect, test } from "@jest/globals";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryHours, renderCurrentDate } from "@/utils/utils";

import { DAYS_OF_WEEK, NUM_OF_PLANETARY_HOURS } from "@/utils/constants";
import { DayOfWeek, Planet } from "@/utils/enums";
import { HourLengths, PlanetaryDate } from "@/utils/interfaces";
import PlanetaryInfo from "@/models/PlanetaryInfo";

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

describe('generatePlanetaryHours function', () => {
    const currentDate = new Date("March 25, 2026 06:55:00");
    const hourTime = 61.833333333333336;

    test('expect the first hour to match the planetary day, and to increment and wrap around again from there (i.e. if Mercury is first day, then the Moon is next, and then Saturn, etc.', () => {
        const daytimeHours = generatePlanetaryHours(currentDate, hourTime);
        
        const planetResults = [
            Planet.Mercury,
            Planet.Moon,
            Planet.Saturn,
            Planet.Jupiter,
            Planet.Mars,
            Planet.Sun,
            Planet.Venus,
            Planet.Mercury,
            Planet.Moon,
            Planet.Saturn,
            Planet.Jupiter,
            Planet.Mars,
        ]

        expect.assertions(NUM_OF_PLANETARY_HOURS);

        for (let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
            const { planet: p } = daytimeHours[i];
            expect(p).toEqual(PlanetaryInfo.getPlanetaryInfo(planetResults[i]));
        }
    });

    test('startTime should be less than endTime for all given hours', () => {
        const daytimeHours = generatePlanetaryHours(currentDate, hourTime);

        expect.assertions(NUM_OF_PLANETARY_HOURS);

        for (const { startTime, endTime } of daytimeHours) {
            expect(startTime.getTime()).toBeLessThan(endTime.getTime());
        }
    });

    test('endTime of previous hour should match startTime of next hour', () => {
        const daytimeHours = generatePlanetaryHours(currentDate, hourTime);

        expect.assertions(NUM_OF_PLANETARY_HOURS - 1);

        for (let i = 0; i < daytimeHours.length - 1; i++) {
            const currentHour = daytimeHours[i];
            const nextHour = daytimeHours[i+1];

            expect(currentHour.endTime.getTime()).toEqual(nextHour.startTime.getTime());
        }
    });

    test('should be able to update the planet of the initial planetary hour, and the circuit of the following planets should reflect this.', () => {
        const daytimeHours = generatePlanetaryHours(currentDate, hourTime, true);

        const planetResults = [
            Planet.Sun,
            Planet.Venus,
            Planet.Mercury,
            Planet.Moon,
            Planet.Saturn,
            Planet.Jupiter,
            Planet.Mars,
            Planet.Sun,
            Planet.Venus,
            Planet.Mercury,
            Planet.Moon,
            Planet.Saturn
        ];
        expect.assertions(NUM_OF_PLANETARY_HOURS);

        for (let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
            const { planet: p } = daytimeHours[i];
            expect(p.planet).toEqual(planetResults[i]);
        }
    });
});

describe('renderCurrentDate', () => {
    const date = new Date("March 25, 2026 06:55:00");
        const planetaryDate: PlanetaryDate = {
            date,
            dayOfWeek: DAYS_OF_WEEK[date.getDay()]
        }

    test('renders the correct date string', () => {
        const expectedString = "Wednesday (☿), March 25, 2026";
        
        expect(renderCurrentDate(planetaryDate)).toEqual(expectedString);
    });
});
