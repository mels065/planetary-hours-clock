import { Planet, DayOfWeek } from "./enums";
import { DayOfWeekObj } from "./interfaces";

export const DAYS_OF_WEEK: DayOfWeekObj[] = [
    {
        name: DayOfWeek.Sunday,
        planet: Planet.Sun
    },
    {
        name: DayOfWeek.Monday,
        planet: Planet.Moon
    },
    {
        name: DayOfWeek.Tuesday,
        planet: Planet.Mars
    },
    {
        name: DayOfWeek.Wednesday,
        planet: Planet.Mercury
    },
    {
        name: DayOfWeek.Thursday,
        planet: Planet.Jupiter
    },
    {
        name: DayOfWeek.Friday,
        planet: Planet.Venus
    },
    {
        name: DayOfWeek.Saturday,
        planet: Planet.Saturn
    },
]

export const MINUTES_IN_DAY = 1440;
export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const NUM_OF_PLANETARY_HOURS = 12;
