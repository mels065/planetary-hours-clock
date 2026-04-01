import { DAYS_OF_WEEK, MINUTES_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE, NUM_OF_PLANETARY_HOURS } from "./constants";
import { Planet } from "./enums";
import { HourLengths, PlanetaryHour } from "./interfaces";

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
    const daytimeHours : PlanetaryHour[] = [];
    let planet: Planet;
    if (isNight) {
        planet = (DAYS_OF_WEEK[startTime.getDay()].planet + NUM_OF_PLANETARY_HOURS) % getNumOfPlanets();
    } else {
        planet = DAYS_OF_WEEK[startTime.getDay()].planet;
    }

    for(let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
        daytimeHours.push({
            startTime: new Date(startTime.getTime() + (hourTime * i)),
            endTime: new Date(startTime.getTime() + (hourTime * (i+1))),
            planet
        });
        planet = ((planet + 1) % getNumOfPlanets());
    }

    return daytimeHours;
}

export function getNumOfPlanets(): number {
    return Math.floor(Object.keys(Planet).length / 2);
}
