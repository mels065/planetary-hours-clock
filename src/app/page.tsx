"use client"

import { useEffect } from "react";
import PlanetaryHourDisplay from "@/components/PlanetaryHourDisplay";
import PlanetaryHourTimeTable from "@/components/PlanetaryHourTimeTable";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";

export default function Home() {
  const { handleClock } = useSunriseAndSunset();

  useEffect(() => {
    handleClock();
  }, []);

  return (
    <div>
      <main>
        <h1>Planetary Hour Clock</h1>
        <PlanetaryHourDisplay />
        <PlanetaryHourTimeTable />
      </main>
    </div>
  );
}
