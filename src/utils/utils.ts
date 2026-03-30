import { MINUTES_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE, NUM_OF_PLANETARY_HOURS } from "./constants";
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

export function generatePlanetaryDaytimeHours(currentDate: Date, daytimeHourTime: number): PlanetaryHour[] {
    const startTime = new Date();
    const endTime = new Date((startTime.getTime() + 60));

    return [
        {
            startTime,
            endTime,
            planet: Planet.Mercury,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Moon,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Saturn,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Jupiter,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Mars,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Sun,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Venus,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Mercury,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Moon,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Saturn,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Jupiter,
        },
        {
            startTime: new Date(),
            endTime: new Date(),
            planet: Planet.Mars,
        },
    ];
}

export function getNumOfPlanets(): number {
    return Math.floor(Object.keys(Planet).length / 2);
}
