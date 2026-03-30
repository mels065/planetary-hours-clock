import { Planet, DayOfWeek } from "./enums";

export interface DayOfWeekObj {
    name: DayOfWeek;
    planet: Planet;
}

export interface HourLengths {
    daytimeHourTime: number;
    nighttimeHourTime: number;
}

export interface PlanetaryHour {
    startTime: Date;
    endTime: Date;
    planet: Planet;
}
