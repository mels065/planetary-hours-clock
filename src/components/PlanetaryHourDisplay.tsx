"use client"

import useClockStore from "@/store/clockStore";

import PlanetaryHourWrapper from "./PlanetaryHourWrapper";
import PlanetaryDateWrapper from "./PlanetaryDateWrapper";

export default function PlanetaryHourDisplay() {
    const clock = useClockStore((state) => state.clock);
    const { currentDate, currentHour } = clock;

    return (
        <>
            {
                currentDate && currentHour && (
                    <div className="p-20 mb-10 bg-malachite rounded-mystic text-center text-xl font-bold w-full md:w-[60%] mx-auto shadow-lg">
                        <PlanetaryDateWrapper planetaryDate={currentDate} />
                        <div className="font-space-grotesk text-moonlight">
                            <PlanetaryHourWrapper planetaryHour={currentHour} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
