import { DAYS_OF_WEEK, MINUTES_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE, NUM_OF_PLANETARY_HOURS } from "./constants";
import { Planet, DayOfWeek, Month } from "./enums";
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
    const daytimeHours : PlanetaryHour[] = [];
    let planet: PlanetaryInfo;
    if (isNight) {
        planet = PlanetaryInfo.getPlanetaryInfo((DAYS_OF_WEEK[startTime.getDay()].planet.planet + NUM_OF_PLANETARY_HOURS) % PlanetaryInfo.getNumOfPlanets());
    } else {
        planet = DAYS_OF_WEEK[startTime.getDay()].planet;
    }

    for(let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
        daytimeHours.push({
            startTime: new Date(startTime.getTime() + (hourTime * i)),
            endTime: new Date(startTime.getTime() + (hourTime * (i+1))),
            planet
        });
        planet = planet.getNextPlanet();
    }

    return daytimeHours;
}

export function renderCurrentDate(planetaryDate: PlanetaryDate): string {
    const dayOfWeek = DayOfWeek[planetaryDate.dayOfWeek.name];
    const planetarySigil = planetaryDate.dayOfWeek.planet.sigil;
    const month = Month[planetaryDate.date.getMonth()];
    const day = planetaryDate.date.getDate();
    const year = planetaryDate.date.getFullYear();

    return `${dayOfWeek} (${planetarySigil}), ${month} ${day}, ${year}`
}

export function getNumOfPlanets(): number {
    return Math.floor(Object.keys(Planet).length / 2);
}
