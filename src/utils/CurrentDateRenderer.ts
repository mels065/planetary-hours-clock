// Enums
import { staticImplements } from "@/decorators";
import DayOfWeekName from "@/enums/DayOfWeekName";
import Month from "@/enums/Month";

// Interfaces
import DisplayTextRenderer from "@/interfaces/DisplayTextRenderer";

import PlanetaryDate from "@/interfaces/PlanetaryDate";

@staticImplements<DisplayTextRenderer<PlanetaryDate>>()
export default class CurrentDateRenderer {
    public static render(planetaryDate: PlanetaryDate): string {
        const dayOfWeek = DayOfWeekName[planetaryDate.dayOfWeek.name];
        const planetarySigil = planetaryDate.dayOfWeek.planet.sigil;
        const month = Month[planetaryDate.date.getMonth()];
        const day = planetaryDate.date.getDate();
        const year = planetaryDate.date.getFullYear();

        return `${dayOfWeek} (${planetarySigil}), ${month} ${day}, ${year}`;
        return "";
    }
}