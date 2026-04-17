import { PlanetaryHour } from "@/utils/interfaces";
import { renderPlanetaryHour } from "@/utils/utils";

export default function PlanetaryHourColumnDataRow(
    { planetaryHour, isInPast }: { planetaryHour: PlanetaryHour, isInPast?: boolean }
)
    {
    return (
        <div className={isInPast ? "text-gray" : ""}>
            {renderPlanetaryHour(planetaryHour)}
        </div>
    );
}
