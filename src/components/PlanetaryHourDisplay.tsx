"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ClockState } from "@/features/clock/clockSlice";

import PlanetaryHourWrapper from "./PlanetaryHourWrapper";
import PlanetaryDateWrapper from "./PlanetaryDateWrapper";
import PlanetaryHour from "@/interfaces/PlanetaryHour";
import PlanetaryDate from "@/interfaces/PlanetaryDate";

export default function PlanetaryHourDisplay() {
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    const { currentDate: stringifiedCurrentDate, currentHour } = clock;

    let currentDate: PlanetaryDate | null = null;
    if (stringifiedCurrentDate) {
        currentDate = JSON.parse(stringifiedCurrentDate) as PlanetaryDate;
    }

    let planetaryHour: PlanetaryHour | null = null;
    if (currentHour) {
        planetaryHour = JSON.parse(currentHour) as PlanetaryHour;
    }

    return (
        <>
            {
                currentDate && planetaryHour && (
                    <div className="p-20 mb-10 bg-malachite rounded-mystic text-center text-xl font-bold w-full md:w-[60%] mx-auto shadow-lg">
                        <PlanetaryDateWrapper planetaryDate={currentDate} />
                        <div className="font-space-grotesk text-moonlight">
                            <PlanetaryHourWrapper planetaryHour={planetaryHour} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
