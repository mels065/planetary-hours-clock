import DayOfWeek from "@/enums/DayOfWeek";
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

export interface SunriseSunsetApiResponse {
    results: {
        sunrise: string;
        sunset: string;
    },
    status: "OK" | "INVALID_REQUEST" | "INVALID_DATE" | "UNKNOWN_ERROR" | "INVALID_TZID"
}
