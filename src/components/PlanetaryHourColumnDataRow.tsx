import PlanetaryHour from "@/interfaces/PlanetaryHour";
import PlanetaryHourRenderer from "@/utils/PlanetaryHourRenderer";

export default function PlanetaryHourColumnDataRow(
    { planetaryHour, isInPast }: { planetaryHour: PlanetaryHour, isInPast?: boolean }
)
    {
    return (
        // <div className={`font-space-grotesk${isInPast ? " text-gray" : ""}`}>
        <div className="even:bg-moonlight odd:bg-shade last:rounded-b-mystic text-obsidian font-space-grotesk text-moonlight p-2">
            {PlanetaryHourRenderer.render(planetaryHour)}
        </div>
    );
}
