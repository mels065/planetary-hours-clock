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
