"use client"

import { useSelector } from "react-redux";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { RootState } from "@/store";
import { ClockState } from "@/features/clock/clockSlice";

export default function PlanetaryHourDisplay() {
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    const { currentDate, currentHour } = clock;

    return (
        <>
            {
                currentDate && currentHour && (
                    <div className="p-2 text-center text-xl font-bold">
                        <div>{currentDate}</div>
                        <div>{currentHour}</div>
                    </div>
                )
            }
        </>
    )
}
