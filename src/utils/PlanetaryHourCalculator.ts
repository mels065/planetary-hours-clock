import PlanetaryHour from '@/interfaces/PlanetaryHour';

import { MILLISECONDS_IN_SECOND, SECONDS_IN_MINUTE, MINUTES_IN_DAY, NUM_OF_PLANETARY_HOURS, DAYS_OF_WEEK } from '../constants';
import PlanetaryInfo from '@/models/PlanetaryInfo';

import DateTimeUtils from '@/utils/DateTimeUtils';

export default class PlanetaryHourCalculator {
    private dayHours: PlanetaryHour[] = [];
    private nightHours: PlanetaryHour[] = [];

    public generatePlanetaryHours(sunrise: Date, sunset: Date): void {
        const daytimeHourTime = this.calculateDaytimeHourLengths(sunrise, sunset);
        const nighttimeHourTime = this.calculateNighttimeHourLengths(sunrise, sunset);

        const daytimeHourTimeMs = daytimeHourTime * 60 * 1000;
        const nighttimeHourTimeMs = nighttimeHourTime * 60 * 1000;

        let planet: PlanetaryInfo = DAYS_OF_WEEK[sunrise.getDay()].planet;
        
        for (let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
            this.dayHours.push({
                startTime: new Date(sunrise.getTime() + (daytimeHourTimeMs * i)),
                endTime: new Date(sunrise.getTime() + (daytimeHourTimeMs * (i + 1))),
                planet // Assign the planet information
            });
            planet = planet.getNextPlanet();
        }

        for (let i = 0; i < NUM_OF_PLANETARY_HOURS; i++) {
            this.nightHours.push({
                startTime: new Date(sunset.getTime() + (nighttimeHourTimeMs * i)),
                endTime: new Date(sunset.getTime() + (nighttimeHourTimeMs * (i + 1))),
                planet // Assign the planet information
            });
            planet = planet.getNextPlanet();
        }
    }

    public getDayHours(): PlanetaryHour[] {
        return this.dayHours.map(hour => ({ ...hour, planet: { ...hour.planet } })); // Return a copy of the day hours
    }

    public getNightHours(): PlanetaryHour[] {
        return this.nightHours.map(hour => ({ ...hour, planet: { ...hour.planet } })); // Return a copy of the night hours
    }

    public getCurrentPlanetaryHour(): PlanetaryHour {
        const currentDate = DateTimeUtils.getCurrentDateTime(); // Use DateTimeUtils to get the current date and time

        for (const hour of [...this.getDayHours(), ...this.getNightHours()]) {
            if (hour.startTime <= currentDate && hour.endTime > currentDate) {
                return { ...hour, planet: { ...hour.planet } }; // Return a copy of the current planetary hour
            }
        }

        throw new Error("Unable to resolve current planetary hour!"); // Throw an error if no current planetary hour is found
    }

    private calculateDaytimeHourLengths(sunrise: Date, sunset: Date): number {
        const daytimeSpan = (sunset.getTime() - sunrise.getTime()) / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE; // Get the span of minutes from sunrise to sunset
        return daytimeSpan / NUM_OF_PLANETARY_HOURS;
    }

    private calculateNighttimeHourLengths(sunrise: Date, sunset: Date): number {
        const daytimeSpan = (sunset.getTime() - sunrise.getTime()) / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE; // Get the span of minutes from sunrise to sunset
        const nighttimeSpan = MINUTES_IN_DAY - daytimeSpan;
        return nighttimeSpan / NUM_OF_PLANETARY_HOURS;
    }
}
