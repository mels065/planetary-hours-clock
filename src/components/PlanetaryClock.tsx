"use client"

import PlanetaryHourDisplay from "@/components/PlanetaryHourDisplay";
import PlanetaryHourTimeTable from "@/components/PlanetaryHourTimeTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { getCurrentPlanetaryHour, renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";
import PlanetaryHourCalculator from "@/utils/PlanetaryHourCalculator";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateClock } from "@/features/clock/clockSlice";
import { DAYS_OF_WEEK } from "@/constants";

export default function PlanetaryClock() {
  const { sunriseTimestamp, sunsetTimestamp, apiError } = useSunriseAndSunset();
  const dispatch = useDispatch<AppDispatch>();

  const isClockLoading = !apiError && (sunriseTimestamp.length === 0 || sunsetTimestamp.length === 0);

  if (sunriseTimestamp.length > 0 && sunsetTimestamp.length > 0) {
    const sunrise = new Date(sunriseTimestamp);
    const sunset = new Date(sunsetTimestamp);

    const planetaryHourCalculator = new PlanetaryHourCalculator();
    planetaryHourCalculator.generatePlanetaryHours(sunrise, sunset);

    const dayHours = planetaryHourCalculator.getDayHours();
    const nightHours = planetaryHourCalculator.getNightHours();

    let currentHour;
    try {
      const rawCurrentHour = getCurrentPlanetaryHour([...dayHours, ...nightHours]);
      if (!rawCurrentHour) {
        throw new Error("Unable to resolve current planetary hour!")
      }

      currentHour = renderPlanetaryHour(rawCurrentHour);
    } catch (err) {
      return <h2 className="text-2xl">There was an internal error. Please contact administrator.</h2>;
    }

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
      <>
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
    </>
  );
}