"use client"

import PlanetarySigilIcon from "./PlanetarySigilIcon";
import { DayOfWeek, Month } from "@/utils/enums";
import { DAYS_OF_WEEK } from "@/utils/constants";

export default function PlanetaryDay({ currentDate }: { currentDate: string }) {
    const sunrise = new Date(currentDate);
    const dayOfWeek = DAYS_OF_WEEK[sunrise.getDay()];
    const dayOfWeekName = DayOfWeek[dayOfWeek.name];
    const planetarySigil = dayOfWeek.planet.sigil;
    const month = Month[sunrise.getMonth()];
    const day = sunrise.getDate();
    const year = sunrise.getFullYear();

    return (
        <div>
            <span>{`${dayOfWeekName} `}</span>
            <PlanetarySigilIcon sigil={planetarySigil} size="lg" />
            <span>{` - ${month} ${day}, ${year}`}</span>
        </div>
    );
}