import { describe, expect, jest, test } from "@jest/globals";
import { isNewDay, renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";

import { DAYS_OF_WEEK, NUM_OF_PLANETARY_HOURS } from "@/constants";
import Planet from "@/enums/Planet";
import HourLengths from "@/interfaces/HourLengths";

// Interfaces
import PlanetaryHour from "@/interfaces/PlanetaryHour";
import PlanetaryDate from "@/interfaces/PlanetaryDate";

import PlanetaryInfo from "@/models/PlanetaryInfo";

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
