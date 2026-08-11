import { describe, expect, test } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import PlanetaryHourColumnDataRow from '@/components/PlanetaryHourColumnDataRow';
import { PLANETARY_INFO } from "@/constants";
import Planet from "@/enums/Planet";
import PlanetaryHour from "@/interfaces/PlanetaryHour";
import DateTimeUtils from "@/utils/DateTimeUtils";
import '@testing-library/dom';

describe.skip('PlanetaryHourColumnDataRow', () => {
    const hourString = "Hour of Mercury (☿) / 6:55am - 7:56am";
    const textGray = 'text-gray';
    const regexp = /Hour of/;

    const startTime = DateTimeUtils.createDateFromTimestamp("March 25, 2026 06:55:00");
    const endTime = DateTimeUtils.createDateFromTimestamp("March 25, 2026 07:56:00");
    const planetaryHour: PlanetaryHour = {
        startTime,
        endTime,
        planet: PLANETARY_INFO[Planet.Mercury]
    };

    test('renders with appropriate text', async () => {
        render(<PlanetaryHourColumnDataRow 
            planetaryHour={planetaryHour}
        />);

        const row = await screen.getByText(regexp);
        expect(row.textContent).toEqual(hourString);
    });
});
