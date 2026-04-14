import { Planet, DayOfWeek } from "./enums";
import PlanetaryInfo from "@/models/PlanetaryInfo";

export interface DayOfWeekObj {
    name: DayOfWeek;
    planet: PlanetaryInfo;
}

export interface HourLengths {
    daytimeHourTime: number;
    nighttimeHourTime: number;
}

export interface PlanetaryHour {
    startTime: Date;
    endTime: Date;
    planet: PlanetaryInfo;
}

export interface PlanetaryDate {
    date: Date;
    dayOfWeek: DayOfWeekObj;
}
