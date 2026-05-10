"use client"

import { useEffect } from "react";
import PlanetaryHourDisplay from "@/components/PlanetaryHourDisplay";
import PlanetaryHourTimeTable from "@/components/PlanetaryHourTimeTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";

export default function Home() {
  const { isClockLoading, handleClock } = useSunriseAndSunset();

  useEffect(() => {
    handleClock();
  }, []);

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
