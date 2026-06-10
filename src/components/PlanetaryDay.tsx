"use client"

import PlanetarySigilIcon from "./PlanetarySigilIcon";
import { useSelector } from "react-redux";
import useSunriseAndSunset from "@/hooks/useSunriseAndSunset";
import { RootState } from "@/store";
import { ClockState } from "@/features/clock/clockSlice";
import { DayOfWeek, Month } from "@/utils/enums";
import { DAYS_OF_WEEK } from "@/utils/constants";

export default function PlanetaryDay() {
    const clock = useSelector<RootState, ClockState>(state => state.clock);
    const { currentDate } = clock;

    if (!currentDate) return null;

    const sunrise = new Date(currentDate);
    const dayOfWeek = DAYS_OF_WEEK[sunrise.getDay()];
    const dayOfWeekName = DayOfWeek[dayOfWeek.name];
    const planetarySigil = dayOfWeek.planet.sigil;
    const month = Month[sunrise.getMonth()];
    const day = sunrise.getDate();
    const year = sunrise.getFullYear();

    return (
        <div className="p-2 text-center text-xl font-bold">
            {`${dayOfWeekName}`} <PlanetarySigilIcon sigil={planetarySigil} />{` - ${month} ${day}, ${year}`}
        </div>
    );
}