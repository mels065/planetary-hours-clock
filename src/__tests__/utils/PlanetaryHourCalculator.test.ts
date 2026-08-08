import { describe, expect, test, jest } from "@jest/globals";

import PlanetaryInfo from "@/models/PlanetaryInfo";
import Planet from "@/enums/Planet";
import { NUM_OF_PLANETARY_HOURS, PLANETARY_INFO } from "@/constants";

// Utils
import DateTimeUtils from "@/utils/DateTimeUtils";
import PlanetaryHourCalculator from "@/utils/PlanetaryHourCalculator";

describe('PlanetaryHourCalculator', () => {
    describe('generatePlanetaryHours', () => {
        test('generatePlanetaryHours should generate 12 daytime and 12 nighttime planetary hours', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();
            planetaryHourCalculator.generatePlanetaryHours(sunriseTime, sunsetTime);

            expect(planetaryHourCalculator.getDayHours().length).toEqual(12);
            expect(planetaryHourCalculator.getNightHours().length).toEqual(12);
        });

        test('the first hour should match the planetary day, and to increment and wrap around again from there (i.e. if Mercury is first day, then the Moon is next, and then Saturn, etc.)', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();
            planetaryHourCalculator.generatePlanetaryHours(sunriseTime, sunsetTime);

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
            
            for (let i = 0; i < planetaryHourCalculator.getDayHours().length; i++) {
                expect(planetaryHourCalculator.getDayHours()[i].planet).toEqual(PlanetaryInfo.getPlanetaryInfo(planetResults[i]));
            }
        });

        test('startTime should be less than endTime for all given hours', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();
            planetaryHourCalculator.generatePlanetaryHours(sunriseTime, sunsetTime);

            expect.assertions(NUM_OF_PLANETARY_HOURS * 2);

            for (const { startTime, endTime } of [...planetaryHourCalculator.getDayHours(), ...planetaryHourCalculator.getNightHours()]) {
                expect(startTime.getTime()).toBeLessThan(endTime.getTime());
            }
        });

        test('endTime of previous hour should match startTime of next hour', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();
            planetaryHourCalculator.generatePlanetaryHours(sunriseTime, sunsetTime);

            const dayHours = planetaryHourCalculator.getDayHours();

            expect.assertions(NUM_OF_PLANETARY_HOURS - 1);

            for (let i = 0; i < dayHours.length - 1; i++) {
                const currentHour = dayHours[i];
                const nextHour = dayHours[i+1];

                expect(currentHour.endTime.getTime()).toEqual(nextHour.startTime.getTime());
            }
        });

        test('should be able to update the planet of the initial planetary hour, and the circuit of the following planets should reflect this.', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();
            planetaryHourCalculator.generatePlanetaryHours(sunriseTime, sunsetTime);
            
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
            ];

            expect.assertions(NUM_OF_PLANETARY_HOURS);
            
            for (let i = 0; i < planetaryHourCalculator.getDayHours().length; i++) {
                expect(planetaryHourCalculator.getDayHours()[i].planet.planet).toEqual(planetResults[i]);
            }
        });
    });

    describe('getCurrentPlanetaryHour', () => {
        test('getCurrentPlanetaryHour should return the current planetary hour', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();

            // Mock the dayHours and nightHours in the PlanetaryHourCalculator instance to return 12 hours each for testing purposes
            jest.spyOn(planetaryHourCalculator, 'getDayHours').mockReturnValue([
                { startTime: new Date("March 25, 2026 06:55:00"), endTime: new Date("March 25, 2026 07:55:00"), planet: PLANETARY_INFO[Planet.Mercury] },
                { startTime: new Date("March 25, 2026 07:55:00"), endTime: new Date("March 25, 2026 08:55:00"), planet: PLANETARY_INFO[Planet.Moon] },
                { startTime: new Date("March 25, 2026 08:55:00"), endTime: new Date("March 25, 2026 09:55:00"), planet: PLANETARY_INFO[Planet.Saturn] },
                { startTime: new Date("March 25, 2026 09:55:00"), endTime: new Date("March 25, 2026 10:55:00"), planet: PLANETARY_INFO[Planet.Jupiter] },
                { startTime: new Date("March 25, 2026 10:55:00"), endTime: new Date("March 25, 2026 11:55:00"), planet: PLANETARY_INFO[Planet.Mars] },
                { startTime: new Date("March 25, 2026 11:55:00"), endTime: new Date("March 25, 2026 12:55:00"), planet: PLANETARY_INFO[Planet.Sun] },
                { startTime: new Date("March 25, 2026 12:55:00"), endTime: new Date("March 25, 2026 13:55:00"), planet: PLANETARY_INFO[Planet.Venus] },
                { startTime: new Date("March 25, 2026 13:55:00"), endTime: new Date("March 25, 2026 14:55:00"), planet: PLANETARY_INFO[Planet.Mercury] },
                { startTime: new Date("March 25, 2026 14:55:00"), endTime: new Date("March 25, 2026 15:55:00"), planet: PLANETARY_INFO[Planet.Moon] },
                { startTime: new Date("March 25, 2026 15:55:00"), endTime: new Date("March 25, 2026 16:55:00"), planet: PLANETARY_INFO[Planet.Saturn] },
                { startTime: new Date("March 25, 2026 16:55:00"), endTime: new Date("March 25, 2026 17:55:00"), planet: PLANETARY_INFO[Planet.Jupiter] },
                { startTime: new Date("March 25, 2026 17:55:00"), endTime: new Date("March 25, 2026 18:55:00"), planet: PLANETARY_INFO[Planet.Mars] },
            ]);

            jest.spyOn(planetaryHourCalculator, 'getNightHours').mockReturnValue([
                { startTime: new Date("March 25, 2026 19:17:00"), endTime: new Date("March 25, 2026 20:17:00"), planet: PLANETARY_INFO[Planet.Sun] },
                { startTime: new Date("March 25, 2026 20:17:00"), endTime: new Date("March 25, 2026 21:17:00"), planet: PLANETARY_INFO[Planet.Venus] },
                { startTime: new Date("March 25, 2026 21:17:00"), endTime: new Date("March 25, 2026 22:17:00"), planet: PLANETARY_INFO[Planet.Mercury] },
                { startTime: new Date("March 25, 2026 22:17:00"), endTime: new Date("March 25, 2026 23:17:00"), planet: PLANETARY_INFO[Planet.Moon] },
                { startTime: new Date("March 25, 2026 23:17:00"), endTime: new Date("March 26, 2026 00:17:00"), planet: PLANETARY_INFO[Planet.Saturn] },
                { startTime: new Date("March 26, 2026 00:17:00"), endTime: new Date("March 26, 2026 01:17:00"), planet: PLANETARY_INFO[Planet.Jupiter] },
                { startTime: new Date("March 26, 2026 01:17:00"), endTime: new Date("March 26, 2026 02:17:00"), planet: PLANETARY_INFO[Planet.Mars] },
                { startTime: new Date("March 26, 2026 02:17:00"), endTime: new Date("March 26, 2026 03:17:00"), planet: PLANETARY_INFO[Planet.Sun] },
                { startTime: new Date("March 26, 2026 03:17:00"), endTime: new Date("March 26, 2026 04:17:00"), planet: PLANETARY_INFO[Planet.Venus] },
                { startTime: new Date("March 26, 2026 04:17:00"), endTime: new Date("March 26, 2026 05:17:00"), planet: PLANETARY_INFO[Planet.Mercury] },
                { startTime: new Date("March 26, 2026 05:17:00"), endTime: new Date("March 26, 2026 06:17:00"), planet: PLANETARY_INFO[Planet.Moon] },
                { startTime: new Date("March 26, 2026 06:17:00"), endTime: new Date("March 26, 2026 07:17:00"), planet: PLANETARY_INFO[Planet.Saturn] },
            ]);

            // Mock getCurrentDateTime method in DateTimeUtils to return a time between one of the planetary hours
            jest.spyOn(DateTimeUtils, 'getCurrentDateTime').mockReturnValue(new Date("March 25, 2026 08:30:00"));

            const currentHour = planetaryHourCalculator.getCurrentPlanetaryHour();

            expect(currentHour).toEqual(planetaryHourCalculator.getDayHours()[1]); // The current hour should be the second hour of the day (7:55am - 8:55am)
        });

        // Write a test for the case where the current time does not fall within any of the planetary hours and ensure that it throws an error
        test('getCurrentPlanetaryHour should throw an error if the current time does not fall within any of the planetary hours', () => {
            const sunriseTime = new Date("March 25, 2026 06:55:00");
            const sunsetTime = new Date("March 25, 2026 19:17:00");

            const planetaryHourCalculator = new PlanetaryHourCalculator();

            // Attempt to get the current planetary hour without generating planetary hours first
            expect(() => planetaryHourCalculator.getCurrentPlanetaryHour()).toThrow("Unable to resolve current planetary hour!");
        });
    });
});
