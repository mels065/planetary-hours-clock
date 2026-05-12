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

export default function Home() {
  const { sunrise, sunset } = useSunriseAndSunset();
  const dispatch = useDispatch<AppDispatch>();

  const isClockLoading = !sunrise || !sunset;

  if (sunrise && sunset) {
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
        dayHours,
        nightHours,
    }))
  }

  return (
    <div>
      <main>
        <h1>Planetary Hour Clock</h1>
        {
          isClockLoading && (
            <LoadingSpinner text="Fetching sunrise and sunset times" size="xl" fullScreen={true} />
          )
        }
        {
          !isClockLoading && (
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
