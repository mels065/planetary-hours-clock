"use client"

import PlanetaryHourColumn from "./PlanetaryHourColumn";

import useClockStore from "@/store/clockStore";

export default function PlanetaryHourTimeTable() {
    const clock = useClockStore((state) => state.clock);
    
    const { dayHours, nightHours } = clock;

    return ( 
        <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-20">
            <PlanetaryHourColumn planetaryHours={dayHours} />
            <PlanetaryHourColumn planetaryHours={nightHours} isNight={true} />
        </div>
    )
}
