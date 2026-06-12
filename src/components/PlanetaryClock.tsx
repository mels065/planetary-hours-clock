"use client"

import PlanetaryHourDisplay from "@/components/PlanetaryHourDisplay";
import PlanetaryHourTimeTable from "@/components/PlanetaryHourTimeTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryHours, getCurrentPlanetaryHour, renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";
import { PlanetaryHour } from "@/utils/interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateClock } from "@/features/clock/clockSlice";
import { DAYS_OF_WEEK } from "@/utils/constants";

export default function PlanetaryClock() {
    const { sunriseTimestamp, sunsetTimestamp, apiError } = useSunriseAndSunset();
  const dispatch = useDispatch<AppDispatch>();

  const isClockLoading = !apiError && (sunriseTimestamp.length === 0 || sunsetTimestamp.length === 0);

  if (sunriseTimestamp.length > 0 && sunsetTimestamp.length > 0) {
    const sunrise = new Date(sunriseTimestamp);
    const sunset = new Date(sunsetTimestamp);

    const { daytimeHourTime, nighttimeHourTime } = calculateDaytimeAndNighttimeHourLengths(
        sunrise,
        sunset,
    );

    const dayHours = generatePlanetaryHours(sunrise, daytimeHourTime);
    const nightHours = generatePlanetaryHours(sunset, nighttimeHourTime, true);

    const currentHour = renderPlanetaryHour(getCurrentPlanetaryHour([...dayHours, ...nightHours]) as PlanetaryHour);

    dispatch(updateClock({
        currentDate: renderCurrentDate({
            date: sunrise,
            dayOfWeek: DAYS_OF_WEEK[sunrise.getDay()]
        }),
        currentHour,
        dayHours: JSON.stringify(dayHours),
        nightHours: JSON.stringify(nightHours),
    }))
  }

  return (
    <div>
      <header className="p-8 bg-blue-400">
        <h1 className="text-3xl text-center text-white font-bold">Planetary Hour Clock</h1>
      </header>
      <main className="m-8">
        {
          isClockLoading && (
            <LoadingSpinner text="Fetching sunrise and sunset times" size="xl" fullScreen={true} />
          )
        }
        {
          apiError && (
            <h2 className="text-2xl">There was an internal error. Please contact administrator.</h2>
          )
        }
        {
          !apiError && !isClockLoading && (
            <>
              <PlanetaryHourDisplay />
              <PlanetaryHourTimeTable />
            </>
          )
        }
      </main>
    </div>
  );
}