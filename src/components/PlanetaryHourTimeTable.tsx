"use client"

import PlanetaryHourColumn from "./PlanetaryHourColumn";
import PlanetaryHour from "@/interfaces/PlanetaryHour";
import { useSelector } from "react-redux";
import { ClockState } from "@/features/clock/clockSlice";
import { RootState } from "../store";

export default function PlanetaryHourTimeTable() {
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    
    const { dayHours: dayHoursJson, nightHours: nightHoursJson } = clock;
    const dayHours = JSON.parse(dayHoursJson) as PlanetaryHour[];
    const nightHours = JSON.parse(nightHoursJson) as PlanetaryHour[];

    return ( 
        <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-20">
            <PlanetaryHourColumn planetaryHours={dayHours} />
            <PlanetaryHourColumn planetaryHours={nightHours} isNight={true} />
        </div>
    )
}
