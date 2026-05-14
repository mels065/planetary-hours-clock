"use client"

import PlanetaryHourColumn from "./PlanetaryHourColumn";
import { PlanetaryHour } from "@/utils/interfaces";
import { useSelector } from "react-redux";
import { ClockState } from "@/features/clock/clockSlice";
import { RootState } from "../store";

export default function PlanetaryHourTimeTable() {
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    
    const { dayHours: dayHoursJson, nightHours: nightHoursJson } = clock;
    const dayHours = JSON.parse(dayHoursJson) as PlanetaryHour[];
    const nightHours = JSON.parse(nightHoursJson) as PlanetaryHour[];

    return ( 
        <div>
            <PlanetaryHourColumn planetaryHours={dayHours} />
            <PlanetaryHourColumn planetaryHours={nightHours} isNight={true} />
        </div>
    )
}
