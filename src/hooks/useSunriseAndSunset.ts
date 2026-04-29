import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Planet } from "@/utils/enums";
import { DAYS_OF_WEEK } from "@/utils/constants";
import { updateClock, ClockState } from "@/features/clock/clockSlice";
import { RootState, AppDispatch } from "../store";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryHours, renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";

export default function useSunriseAndSunset() {
    /* TODO: 1. Check if data in localstorage is current to the day, meaning that:
                - It is currently the same day as the day saved in localstore.
                - It is the next day, but it is before sunrise.
                If none of these conditions are met, the data will need to be updated with an API call
            2. If changed, set new sunrise, sunset, and day, and return data
    */
    const [isClockLoading, setIsClockLoading] = useState<boolean>(true);
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    const dispatch = useDispatch<AppDispatch>();

    const handleClock = async () => {
        setIsClockLoading(true);
        try {
            const date = new Date("March 25, 2026 06:55:00");
            const sunset = new Date("March 25, 2026 19:17:00");

            const { daytimeHourTime, nighttimeHourTime } = calculateDaytimeAndNighttimeHourLengths(
                date,
                sunset,
            );

            dispatch(updateClock({
                currentDate: renderCurrentDate({
                    date,
                    dayOfWeek: DAYS_OF_WEEK[date.getDay()]
                }),
                currentHour: renderPlanetaryHour({
                    startTime: new Date("March 25, 2026 06:55:00"),
                    endTime: new Date("March 25, 2026 07:56:00"),
                    planet: DAYS_OF_WEEK[date.getDay()].planet
                }),
                dayHours: generatePlanetaryHours(date, daytimeHourTime),
                nightHours: generatePlanetaryHours(sunset, nighttimeHourTime, true),
            }))
        } catch (error) {

        } finally {
            setIsClockLoading(false);
        }
    };
    
    return {
        isClockLoading,
        clock,
        handleClock
    };
}
