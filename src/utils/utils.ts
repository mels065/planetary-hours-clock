import MeridiemIndicator from "@/types/MeridiemIndicator";
import { 
    DAYS_OF_WEEK,
    MINUTES_IN_DAY,
    MILLISECONDS_IN_SECOND,
    MILLISECONDS_IN_DAY,
    SECONDS_IN_MINUTE,
    NUM_OF_PLANETARY_HOURS
} from "./constants";

// Enums
import Planet from "@/enums/Planet";
import DayOfWeek from "@/enums/DayOfWeek";
import Month from "@/enums/Month";

import { HourLengths, PlanetaryHour, PlanetaryDate } from "./interfaces";
import PlanetaryInfo from "@/models/PlanetaryInfo";

export function calculateDaytimeAndNighttimeHourLengths(sunriseTime: Date, sunsetTime: Date): HourLengths {
    const daytimeSpan = (sunsetTime.getTime() - sunriseTime.getTime()) / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE; // Get the span of minutes from sunrise to sunset
    const nighttimeSpan = MINUTES_IN_DAY - daytimeSpan;

    const daytimeHourTime = daytimeSpan / NUM_OF_PLANETARY_HOURS;
    const nighttimeHourTime = nighttimeSpan / NUM_OF_PLANETARY_HOURS;

    return {
        daytimeHourTime,
        nighttimeHourTime,
    };
}

/*
    Function that generates the hours for either day or night
    startTime: Date - The time that the initial hour should start at.
    hourTime: number - The amount  of minutes that consists an hour.
    isNight?: boolean - Optional boolean to indicate if night hours (effects starting planet).
*/
export function generatePlanetaryHours(startTime: Date, hourTime: number, isNight?: boolean): PlanetaryHour[] {
    const hours : PlanetaryHour[] = [];
    let planet: PlanetaryInfo;
    if (isNight) {
        planet = PlanetaryInfo.getPlanetaryInfo((DAYS_OF_WEEK[startTime.getDay()].planet.planet + NUM_OF_PLANETARY_HOURS) % PlanetaryInfo.getNumOfPlanets());
    } else {
        planet = DAYS_OF_WEEK[startTime.getDay()].planet;
    }

    const hourTimeMs = hourTime * 60 * 1000;
    for(let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
        hours.push({
            startTime: new Date(startTime.getTime() + (hourTimeMs * i)),
            endTime: new Date(startTime.getTime() + (hourTimeMs * (i+1))),
            planet
        });
        planet = planet.getNextPlanet();
    }

    return hours;
}

export function renderCurrentDate(planetaryDate: PlanetaryDate): string {
    const dayOfWeek = DayOfWeek[planetaryDate.dayOfWeek.name];
    const planetarySigil = planetaryDate.dayOfWeek.planet.sigil;
    const month = Month[planetaryDate.date.getMonth()];
    const day = planetaryDate.date.getDate();
    const year = planetaryDate.date.getFullYear();

    return `${dayOfWeek} (${planetarySigil}), ${month} ${day}, ${year}`
}

export function renderPlanetaryHour(planetaryHour: PlanetaryHour): string {
    const { startTime, endTime, planet } = planetaryHour

    const planetName = Planet[planet.planet];
    const planetarySigil = planet.sigil;
    const formattedStartTime = createTimeString(new Date(startTime));
    const formattedEndTime = createTimeString(new Date(endTime));


    return `Hour of ${planetName} (${planetarySigil}) / ${formattedStartTime} - ${formattedEndTime}`;
}

export function renderSunriseSunsetApiUrl(lat: number, lon: number, tzid: string, getYesterday?: boolean): string {
    let apiString = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0&tzid=${tzid}`;
    if (getYesterday) {
        apiString += "&date=yesterday";
    }
    return apiString;
}

export function getCurrentPlanetaryHour(planetaryHours: PlanetaryHour[]): PlanetaryHour | null {
    const currentDate = new Date();
    
    for (const hour of planetaryHours) {
        if (hour.startTime <= currentDate && hour.endTime > currentDate) {
            return hour;
        }
    }
    
    return null;
}

export function isNewDay(sunriseTimestamp: string): boolean {
    const currentDate = new Date(Date.now());
    const sunrise = new Date(sunriseTimestamp);

    const oneDayLaterFromSunrise = new Date(sunrise);
    oneDayLaterFromSunrise.setTime(oneDayLaterFromSunrise.getTime() + MILLISECONDS_IN_DAY);

    return currentDate >= oneDayLaterFromSunrise;
}

function createTimeString(date: Date) {
    let hour = date.getHours();
    const minutes = date.getMinutes();

    let period: MeridiemIndicator = "am";

    if (hour === 0) {
        hour = 12;
    } else if (hour >= 12) {
        period = "pm";

        if (hour >= 13) {
            hour -= 12;
        }
    }

    return `${hour}:${minutes.toString().padStart(2, "0")}${period}`;
}
