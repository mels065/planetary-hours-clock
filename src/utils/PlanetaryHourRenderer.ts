import { staticImplements } from "@/decorators";

// Enums
import Planet from "@/enums/Planet";

// Interfaces
import DisplayTextRenderer from "@/interfaces/DisplayTextRenderer";
import PlanetaryHour from "@/interfaces/PlanetaryHour";

import TimeStringRenderer from "./TimeStringRenderer";

@staticImplements<DisplayTextRenderer<PlanetaryHour>>()
export default class PlanetaryHourRenderer {
    public static render(planetaryHour: PlanetaryHour): string {
        const { startTime, endTime, planet } = planetaryHour

        const planetName = Planet[planet.planet];
        const planetarySigil = planet.sigil;
        const formattedStartTime = TimeStringRenderer.render(new Date(startTime));
        const formattedEndTime = TimeStringRenderer.render(new Date(endTime));

        return `Hour of ${planetName} (${planetarySigil}) / ${formattedStartTime} - ${formattedEndTime}`;
    }
}
