"use client"

import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";

export default function PlanetaryHourDisplay() {
    const { clock } = useSunriseAndSunset();
    const { currentDate, currentHour } = clock;

    return (
        <>
            {
                currentDate && currentHour && (
                    <div>
                        <div>{currentDate}</div>
                        <div>{currentHour}</div>
                    </div>
                )
            }
        </>
    )
}
