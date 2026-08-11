import PlanetaryHour from "@/interfaces/PlanetaryHour";

import Planet from "@/enums/Planet";
import TimeStringRenderer from "@/utils/TimeStringRenderer";
import DateTimeUtils from "@/utils/DateTimeUtils";

import SigilWrapper from "./SigilWrapper";

export default function PlanetaryHourWrapper({ planetaryHour }: { planetaryHour: PlanetaryHour }) {
    const { startTime, endTime, planet } = planetaryHour

        const planetName = Planet[planet.planet];
        const planetarySigil = planet.sigil;
        const formattedStartTime = TimeStringRenderer.render(DateTimeUtils.createDate(startTime));
        const formattedEndTime = TimeStringRenderer.render(DateTimeUtils.createDate(endTime));
    return (
        <>
            {`Hour of ${planetName}`} <SigilWrapper sigil={planetarySigil} /> {`: ${formattedStartTime} - ${formattedEndTime}`}
        </>
    )
}