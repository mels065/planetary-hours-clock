"use client"

import { useState, useEffect } from "react";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { calculateDaytimeAndNighttimeHourLengths, generatePlanetaryHours } from "@/utils/utils";
import PlanetaryHourColumn from "./PlanetaryHourColumn";
import { PlanetaryHour } from "@/utils/interfaces";

export default function PlanetaryHourTimeTable() {
    const { clock } = useSunriseAndSunset();
    
    const { dayHours, nightHours } = clock;

    return ( 
        <div>
            <PlanetaryHourColumn planetaryHours={dayHours} />
            <PlanetaryHourColumn planetaryHours={nightHours} isNight={true} />
        </div>
    )
}
