import PlanetaryHour from "@/interfaces/PlanetaryHour";
import PlanetaryHourColumnDataRow from "./PlanetaryHourColumnDataRow";

export default function PlanetaryHourColumn({ planetaryHours, isNight }: { planetaryHours: PlanetaryHour[], isNight?: boolean }) {
    return (
        <div>
            <h2 className="text-lg font-bold">{isNight ? "Night" : "Day"} Hours</h2>
            {
                planetaryHours.map(hour => {
                    return <PlanetaryHourColumnDataRow
                        key={JSON.stringify(hour)}
                        planetaryHour={hour}
                        isInPast={hour.endTime <= new Date()}
                    />
                })
            }
        </div>
    );
}
