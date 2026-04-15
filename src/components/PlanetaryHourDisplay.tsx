"use client"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateClock, ClockState } from "@/features/clock/clockSlice";
import { RootState, AppDispatch } from "../store";
import { Planet, DayOfWeek, Month } from "@/utils/enums";
import PlanetaryInfo from "@/models/PlanetaryInfo";
import { renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";
import { DAYS_OF_WEEK } from "@/utils/constants";

export default function PlanetaryHourDisplay() {
    const { currentDate, currentHour } = useSelector<RootState, ClockState>(state => state.clock);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const date = new Date("March 25, 2026 06:55:00");
        dispatch(updateClock({
            currentDate: renderCurrentDate({
                date,
                dayOfWeek: DAYS_OF_WEEK[date.getDay()]
            }),
            currentHour: renderPlanetaryHour({
                startTime: new Date("March 25, 2026 06:55:00"),
                endTime: new Date("March 25, 2026 07:56:00"),
                planet: DAYS_OF_WEEK[date.getDay()].planet
            })
        }))
    }, [dispatch]);

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
