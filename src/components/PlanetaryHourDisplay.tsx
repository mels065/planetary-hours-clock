"use client"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { updateClock, ClockState } from "@/features/clock/clockSlice";
import { RootState, AppDispatch } from "../store";
import { renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";
import { DAYS_OF_WEEK } from "@/utils/constants";

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
