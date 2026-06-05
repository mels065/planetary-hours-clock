import { PlanetaryHour } from "@/utils/interfaces";
import PlanetaryHourColumnDataRow from "./PlanetaryHourColumnDataRow";

export default function PlanetaryHourColumn({ planetaryHours, isNight }: { planetaryHours: PlanetaryHour[], isNight?: boolean }) {
    return (
        <div>
            <h2>{isNight ? "Night" : "Day"} Hours</h2>
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
