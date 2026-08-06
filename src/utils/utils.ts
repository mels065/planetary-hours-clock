import MeridiemIndicator from "@/types/MeridiemIndicator";
import { MILLISECONDS_IN_DAY } from "../constants";

// Enums
import Planet from "@/enums/Planet";

// Interfaces
import PlanetaryHour from "@/interfaces/PlanetaryHour";

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
