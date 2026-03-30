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
    let startTime = new Date();
    let endTime = new Date((startTime.getTime() + 60));

    return [
        {
            startTime,
            endTime,
            planet: Planet.Mercury,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Moon,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Saturn,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Jupiter,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Mars,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Sun,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Venus,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Mercury,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Moon,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Saturn,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Jupiter,
        },
        {
            startTime: (startTime = endTime),
            endTime: (endTime = new Date((startTime.getTime() + 60))),
            planet: Planet.Mars,
        },
    ];
}

export function getNumOfPlanets(): number {
    return Math.floor(Object.keys(Planet).length / 2);
}
