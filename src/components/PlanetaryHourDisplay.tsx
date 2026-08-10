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
                    <div className="p-20 mb-10 bg-malachite rounded-mystic text-center text-xl font-bold w-full md:w-[60%] mx-auto shadow-lg">
                        <div className="font-forum text-moonlight text-4xl/15 uppercase">{currentDate}</div>
                        <div className="font-space-grotesk text-moonlight">{currentHour}</div>
                    </div>
                )
            }
        </>
    )
}
