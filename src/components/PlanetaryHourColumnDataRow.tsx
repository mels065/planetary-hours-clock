import PlanetaryHour from "@/interfaces/PlanetaryHour";
import PlanetaryHourWrapper from "./PlanetaryHourWrapper";

export default function PlanetaryHourColumnDataRow(
    { planetaryHour }: { planetaryHour: PlanetaryHour }
)
    {
    return (
        <div className="even:bg-moonlight odd:bg-shade last:rounded-b-mystic text-obsidian font-space-grotesk p-2 min-h-8">
            <PlanetaryHourWrapper planetaryHour={planetaryHour} />
        </div>
    );
}
