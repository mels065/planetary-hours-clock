import { staticImplements } from "@/decorators";

// Enums
import Planet from "@/enums/Planet";

// Interfaces
import DisplayTextRenderer from "@/interfaces/DisplayTextRenderer";
import PlanetaryHour from "@/interfaces/PlanetaryHour";

// Utils
import DateTimeUtils from "./DateTimeUtils";
import TimeStringRenderer from "./TimeStringRenderer";

@staticImplements<DisplayTextRenderer<PlanetaryHour>>()
export default class PlanetaryHourRenderer {
    public static render(planetaryHour: PlanetaryHour): string {
        const { startTime, endTime, planet } = planetaryHour

        const planetName = Planet[planet.planet];
        const planetarySigil = planet.sigil;
        const formattedStartTime = TimeStringRenderer.render(DateTimeUtils.createDate(startTime));
        const formattedEndTime = TimeStringRenderer.render(DateTimeUtils.createDate(endTime));

        return `Hour of ${planetName} ${planetarySigil} : ${formattedStartTime} - ${formattedEndTime}`;
    }
}
