import { Planet } from "@/utils/enums";
import { PlanetaryHour } from "@/utils/interfaces";
import { createTimeString } from "@/utils/utils";
import PlanetarySigilIcon from "./PlanetarySigilIcon";

export default function PlanetaryHourText({ planetaryHour, isInClockDisplay }: { planetaryHour: PlanetaryHour, isInClockDisplay?: boolean }) {
    const { startTime, endTime, planet } = planetaryHour;

    const planetName = Planet[planet.planet];
    const planetarySigil = planet.sigil;
    const formattedStartTime = createTimeString(new Date(startTime));
    const formattedEndTime = createTimeString(new Date(endTime));

    return (
        <div>
            <span>{`Hour of ${planetName}`} </span>
            <PlanetarySigilIcon sigil={planetarySigil} size={isInClockDisplay ? "lg" : "md"} />
            <span>{` / ${formattedStartTime} - ${formattedEndTime}`}</span>
        </div>
    )
}
