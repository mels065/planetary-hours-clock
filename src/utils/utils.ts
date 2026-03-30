import { MINUTES_IN_DAY, MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE, NUM_OF_PLANETARY_HOURS } from "./constants";
import { HourLengths } from "./interfaces";

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
