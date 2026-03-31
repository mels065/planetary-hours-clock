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

export function generatePlanetaryDaytimeHours(sunriseTime: Date, daytimeHourTime: number): PlanetaryHour[] {
    const daytimeHours : PlanetaryHour[] = [];
    let { planet } = DAYS_OF_WEEK[sunriseTime.getDay()];

    for(let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
        daytimeHours.push({
            startTime: new Date(sunriseTime.getTime() + (daytimeHourTime * i)),
            endTime: new Date(sunriseTime.getTime() + (daytimeHourTime * (i+1))),
            planet
        });
        planet = ((planet + 1) % getNumOfPlanets());
    }

    return daytimeHours;
}

export function getNumOfPlanets(): number {
    return Math.floor(Object.keys(Planet).length / 2);
}
