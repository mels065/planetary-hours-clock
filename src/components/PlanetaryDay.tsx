"use client"

import { useSelector } from "react-redux";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { RootState } from "@/store";
import { ClockState } from "@/features/clock/clockSlice";

export default function PlanetaryDay() {
    return (
        <div className="p-2 text-center text-xl font-bold"></div>
    );
}