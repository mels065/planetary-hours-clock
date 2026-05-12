import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Planet } from "@/utils/enums";
import { DAYS_OF_WEEK } from "@/utils/constants";
import { PlanetaryHour, SunriseSunsetApiResponse } from "@/utils/interfaces";
import { updateClock, ClockState } from "@/features/clock/clockSlice";
import { RootState, AppDispatch } from "../store";
import { 
    calculateDaytimeAndNighttimeHourLengths,
    generatePlanetaryHours,
    getCurrentPlanetaryHour,
    renderCurrentDate,
    renderPlanetaryHour,
    renderSunriseSunsetApiUrl,
} from "@/utils/utils";

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
        navigator.geolocation.getCurrentPosition(async position => {
            const { coords: { latitude, longitude } } = position;
            setIsClockLoading(true);
            try {
                const apiUrl = renderSunriseSunsetApiUrl(latitude, longitude);
                const res = await axios.get<SunriseSunsetApiResponse>(apiUrl);
                if (res.data.status !== 'OK') {
                    throw new Error(`Response error: ${res.data.status}`);
                }
                const { 
                    sunrise: sunriseTimestamp,
                    sunset: sunsetTimestamp
                } = res.data.results;
                const date = new Date(sunriseTimestamp);
                const sunset = new Date(sunsetTimestamp);

                const { daytimeHourTime, nighttimeHourTime } = calculateDaytimeAndNighttimeHourLengths(
                    date,
                    sunset,
                );

                const dayHours = generatePlanetaryHours(date, daytimeHourTime);
                const nightHours = generatePlanetaryHours(sunset, nighttimeHourTime, true);

                const currentHour = renderPlanetaryHour(getCurrentPlanetaryHour([...dayHours, ...nightHours]) as PlanetaryHour);

                dispatch(updateClock({
                    currentDate: renderCurrentDate({
                        date,
                        dayOfWeek: DAYS_OF_WEEK[date.getDay()]
                    }),
                    currentHour,
                    dayHours,
                    nightHours,
                }))
            } catch (error) {
                console.error(error);
            } finally {
                setIsClockLoading(false);
            }
        })
    };
    
    return {
        isClockLoading,
        clock,
        handleClock
    };
}
