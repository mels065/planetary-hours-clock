import { PlanetaryHour } from "@/utils/interfaces";
import PlanetaryHourText from "./PlanetaryHourText";

export default function PlanetaryHourColumnDataRow(
    { planetaryHour, isInPast }: { planetaryHour: PlanetaryHour, isInPast?: boolean }
)
    {
    return (
        <div className={isInPast ? "text-gray" : ""}>
            <PlanetaryHourText planetaryHour={planetaryHour} />
        </div>
    );
}
