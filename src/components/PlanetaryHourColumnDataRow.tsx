import PlanetaryHour from "@/interfaces/PlanetaryHour";
import PlanetaryHourRenderer from "@/utils/PlanetaryHourRenderer";

export default function PlanetaryHourColumnDataRow(
    { planetaryHour, isInPast }: { planetaryHour: PlanetaryHour, isInPast?: boolean }
)
    {
    return (
        <div className={isInPast ? "text-gray" : ""}>
            {PlanetaryHourRenderer.render(planetaryHour)}
        </div>
    );
}
