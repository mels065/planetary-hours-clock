"use client"

import PlanetaryDay from "./PlanetaryDay";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ClockState } from "@/features/clock/clockSlice";
import PlanetaryHourText from "./PlanetaryHourText";
import { PlanetaryHour } from "@/utils/interfaces";

export default function PlanetaryHourDisplay() {
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    const { currentDate, currentHour } = clock;

    if (!currentDate || !currentHour) {
        return <div />
    }

    return (
        <div className="p-2 text-center text-xl font-bold">
            <PlanetaryDay currentDate={currentDate} />
            <PlanetaryHourText 
                planetaryHour={JSON.parse(currentHour) as PlanetaryHour}
                isInClockDisplay={true}
            />
        </div>
    )
}
