import { useState, useEffect } from "react";

// Services
import SunriseSunsetApiService from "@/services/SunriseSunsetApiService";

// Utils
import DateTimeUtils from "@/utils/DateTimeUtils";

type SunriseSunset = {
    sunriseTimestamp: string,
    sunsetTimestamp: string
    apiError: Error | null;
}

export default function useSunriseAndSunset(): SunriseSunset {
    const [sunriseTimestamp, setSunriseTimestamp] = useState<string>("");
    const [sunsetTimestamp, setSunsetTimestamp] = useState<string>("");
    const [apiError, setApiError] = useState<Error | null>(null);

    useEffect(() => {
        (async () => {
            const savedSunriseData: string = localStorage.getItem('sunriseTimestamp') || "";
            const savedSunsetData: string = localStorage.getItem('sunsetTimestamp') || "";
            const savedTzid: string = localStorage.getItem('tzid') || "";

            const clientTzid = Intl.DateTimeFormat().resolvedOptions().timeZone;

            function IsApiCallNeeded(): boolean {
                function isSavedSunriseDataValid() {
                    return !savedSunriseData || savedSunriseData.length === 0;
                }
                function isSavedSunsetDataValid() {
                    return !savedSunsetData || savedSunsetData.length === 0;
                }
                function isSavedTzidValid() {
                    return !savedTzid || savedTzid.length === 0 || savedTzid !== clientTzid;
                }

                return isSavedSunriseDataValid() || isSavedSunsetDataValid() || isSavedTzidValid() || DateTimeUtils.isNewDay(savedSunriseData);
            }

            if (IsApiCallNeeded()) {
                navigator.geolocation.getCurrentPosition(async position => {
                        const { coords: { latitude, longitude } } = position;

                        try {
                            let res = await SunriseSunsetApiService.fetchSunriseSunsetData({
                                lat: latitude,
                                lon: longitude,
                                tzid: clientTzid,
                            });
                            if (res.status !== 'OK') {
                                throw new Error(`Response error: ${res.status}`);
                            }
                            let {
                                sunrise,
                                sunset,
                            } = res.results;

                            if (DateTimeUtils.getCurrentDateTime() < DateTimeUtils.createDateFromTimestamp(sunrise)) {
                                res = await SunriseSunsetApiService.fetchSunriseSunsetData({
                                    lat: latitude,
                                    lon: longitude,
                                    tzid: clientTzid,
                                    getYesterday: true,
                                });
                                if (res.status !== 'OK') {
                                    throw new Error(`Response error: ${res.status}`);
                                }
                                sunrise = res.results.sunrise;
                                sunset = res.results.sunset;
                            }

                            localStorage.setItem('sunriseTimestamp', sunrise);
                            localStorage.setItem('sunsetTimestamp', sunset);
                            localStorage.setItem('tzid', clientTzid);
                            
                            setSunriseTimestamp(sunrise);
                            setSunsetTimestamp(sunset);
                        } catch (err) {
                            setApiError(err as Error);
                        }
                    })
            } else {
                setSunriseTimestamp(savedSunriseData);
                setSunsetTimestamp(savedSunsetData);
            }
        })();
    }, []);

    return { sunriseTimestamp, sunsetTimestamp, apiError } as SunriseSunset;
}
