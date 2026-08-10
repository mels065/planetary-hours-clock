import { describe, expect, test } from "@jest/globals";

// Constants
import { PLANETARY_INFO } from "@/constants";

import Planet from "@/enums/Planet";
// Interfaces
import PlanetaryHour from "@/interfaces/PlanetaryHour";

import PlanetaryHourRenderer from "@/utils/PlanetaryHourRenderer";

describe('PlanetaryHourRenderer', () => {
    test('renders the correct time string', () => {
        const startTime = new Date("March 25, 2026 06:55:00");
        const endTime = new Date("March 25, 2026 07:56:00");

        const planetaryHour: PlanetaryHour = {
            startTime,
            endTime,
            planet: PLANETARY_INFO[Planet.Mercury],
        };

        const expectedString = "Hour of Mercury ☿ : 6:55am - 7:56am";

        expect(PlanetaryHourRenderer.render(planetaryHour)).toEqual(expectedString);
    });
});
