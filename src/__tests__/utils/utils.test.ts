import { describe, expect, jest, test } from "@jest/globals";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryHours, isNewDay, renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";

import { DAYS_OF_WEEK, NUM_OF_PLANETARY_HOURS } from "@/constants";
import Planet from "@/enums/Planet";
import HourLengths from "@/interfaces/HourLengths";
import PlanetaryHour from "@/interfaces/PlanetaryHour";
import { PlanetaryDate } from "@/utils/interfaces";
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

describe('renderPlanetaryHour', () => {
    const startTime = new Date("March 25, 2026 06:55:00");
    const endTime = new Date("March 25, 2026 07:56:00");
    const planetaryHour: PlanetaryHour = {
        startTime,
        endTime,
        planet: PlanetaryInfo.getPlanetaryInfo(Planet.Mercury)
    };

    test('renders the correct time string', () => {
        const expectedString = "Hour of Mercury (☿) / 6:55am - 7:56am";

        expect(renderPlanetaryHour(planetaryHour)).toEqual(expectedString);
    })
});

describe('isNewDay', () => {
    test('returns false if same day after sunrise', () => {
        const mock = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date("2026-03-25T12:00:00-04:00").valueOf());

        expect(isNewDay("2026-03-25T06:55:00-04:00")).toBeFalsy();

        mock.mockRestore();
    });

    test('returns false if next day, but before sunrise', () => {
        const mock = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date("2026-03-26T00:00:00-04:00").valueOf());

        expect(isNewDay("2026-03-25T06:55:00-04:00")).toBeFalsy();

        mock.mockRestore();
    });

    test('returns true if next day after sunrise', () => {
        const mock = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date("2026-03-26T12:00:00-04:00").valueOf());

        expect(isNewDay("2026-03-25T06:55:00-04:00")).toBeTruthy();

        mock.mockRestore();
    });
});
