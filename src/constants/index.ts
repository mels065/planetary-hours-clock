// Enums
import Planet from "@/enums/Planet";
import DayOfWeek from "@/enums/DayOfWeek";

import { DayOfWeekObj } from "../utils/interfaces";
import PlanetaryInfo from "@/models/PlanetaryInfo";

export const PLANETARY_INFO = {
    [Planet.Saturn]: new PlanetaryInfo(Planet.Saturn, "♄"),
    [Planet.Jupiter]: new PlanetaryInfo(Planet.Jupiter, "♃"),
    [Planet.Mars]: new PlanetaryInfo(Planet.Mars, "♂"),
    [Planet.Sun]: new PlanetaryInfo(Planet.Sun, "☉"),
    [Planet.Venus]: new PlanetaryInfo(Planet.Venus, "♀"),
    [Planet.Mercury]: new PlanetaryInfo(Planet.Mercury, "☿"),
    [Planet.Moon]: new PlanetaryInfo(Planet.Moon, "☽"),
}

export const DAYS_OF_WEEK: DayOfWeekObj[] = [
    {
        name: DayOfWeek.Sunday,
        planet: PLANETARY_INFO[Planet.Sun],
    },
    {
        name: DayOfWeek.Monday,
        planet: PLANETARY_INFO[Planet.Moon],
    },
    {
        name: DayOfWeek.Tuesday,
        planet: PLANETARY_INFO[Planet.Mars],
    },
    {
        name: DayOfWeek.Wednesday,
        planet: PLANETARY_INFO[Planet.Mercury],
    },
    {
        name: DayOfWeek.Thursday,
        planet: PLANETARY_INFO[Planet.Jupiter],
    },
    {
        name: DayOfWeek.Friday,
        planet: PLANETARY_INFO[Planet.Venus],
    },
    {
        name: DayOfWeek.Saturday,
        planet: PLANETARY_INFO[Planet.Saturn],
    },
]

export const MINUTES_IN_DAY = 1440;
export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_DAY = MILLISECONDS_IN_SECOND * 60 * 60 * 24;
export const SECONDS_IN_MINUTE = 60;
export const NUM_OF_PLANETARY_HOURS = 12;
