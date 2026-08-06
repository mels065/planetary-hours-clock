import { describe, expect, test } from "@jest/globals";

import { DAYS_OF_WEEK } from "@/constants";
import CurrentDateRenderer from "@/utils/CurrentDateRenderer";
import PlanetaryDate from "@/interfaces/PlanetaryDate";

describe('CurrentDateRenderer', () => {
    test('renders the correct date string', () => {
        const date = new Date("March 25, 2026 06:55:00");
        const planetaryDate: PlanetaryDate = {
            date,
            dayOfWeek: DAYS_OF_WEEK[date.getDay()]
        };

        const expectedString = "Wednesday (☿), March 25, 2026";
        
        expect(CurrentDateRenderer.render(planetaryDate)).toEqual(expectedString);
    });
});
