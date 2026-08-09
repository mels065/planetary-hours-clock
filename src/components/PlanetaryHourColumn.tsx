import PlanetaryHour from "@/interfaces/PlanetaryHour";
import DateTimeUtils from "@/utils/DateTimeUtils";

import PlanetaryHourColumnDataRow from "./PlanetaryHourColumnDataRow";

export default function PlanetaryHourColumn({ planetaryHours, isNight }: { planetaryHours: PlanetaryHour[], isNight?: boolean }) {
    return (
        <div className="bg-twilight rounded-mystic pt-5 shadow-lg">
            <h2 className="text-2xl text-moonlight font-forum font-bold uppercase px-3">{isNight ? "Night" : "Day"} Hours</h2>
            {
                planetaryHours.map(hour => {
                    return <PlanetaryHourColumnDataRow
                        key={JSON.stringify(hour)}
                        planetaryHour={hour}
                        isInPast={hour.endTime <= DateTimeUtils.getCurrentDateTime()}
                    />
                })
            }
        </div>
    );
}
