import { Planet, DayOfWeek } from "./enums";
import { DayOfWeekObj } from "./interfaces";
import PlanetaryInfo from "@/models/PlanetaryInfo";

export const DAYS_OF_WEEK: DayOfWeekObj[] = [
    {
        name: DayOfWeek.Sunday,
        planet: new PlanetaryInfo(Planet.Sun, "☉"),
    },
    {
        name: DayOfWeek.Monday,
        planet: new PlanetaryInfo(Planet.Moon, "☽"),
    },
    {
        name: DayOfWeek.Tuesday,
        planet: new PlanetaryInfo(Planet.Mars, "♂"),
    },
    {
        name: DayOfWeek.Wednesday,
        planet: new PlanetaryInfo(Planet.Mercury, "☿"),
    },
    {
        name: DayOfWeek.Thursday,
        planet: new PlanetaryInfo(Planet.Jupiter, "♃"),
    },
    {
        name: DayOfWeek.Friday,
        planet: new PlanetaryInfo(Planet.Venus, "♀"),
    },
    {
        name: DayOfWeek.Saturday,
        planet: new PlanetaryInfo(Planet.Saturn, "♄"),
    },
]

export const MINUTES_IN_DAY = 1440;
export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const NUM_OF_PLANETARY_HOURS = 12;
