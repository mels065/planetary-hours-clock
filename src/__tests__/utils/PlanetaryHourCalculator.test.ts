import { describe, expect, jest, test } from "@jest/globals";

import PlanetaryHourCalculator from "@/utils/PlanetaryHourCalculator";
import PlanetaryInfo from "@/models/PlanetaryInfo";
import Planet from "@/enums/Planet";
import { NUM_OF_PLANETARY_HOURS } from "@/constants";

describe('PlanetaryHourCalculator', () => {
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
