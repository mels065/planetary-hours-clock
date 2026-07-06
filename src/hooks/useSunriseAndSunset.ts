import { useState, useEffect } from "react";
import { SunriseSunsetApiResponse } from "@/utils/interfaces";
import { renderSunriseSunsetApiUrl, isNewDay } from "@/utils/utils";
import axios from "axios";

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

                return isSavedSunriseDataValid() || isSavedSunsetDataValid() || isSavedTzidValid() || isNewDay(savedSunriseData);
            }

            if (IsApiCallNeeded()) {
                navigator.geolocation.getCurrentPosition(async position => {
                        const { coords: { latitude, longitude } } = position;

                        let apiUrl = renderSunriseSunsetApiUrl(latitude, longitude, clientTzid);
                        try {
                            let res = await axios.get<SunriseSunsetApiResponse>(apiUrl);
                            if (res.data.status !== 'OK') {
                                throw new Error(`Response error: ${res.data.status}`);
                            }
                            let {
                                sunrise,
                                sunset,
                            } = res.data.results;

                            if (new Date() < new Date(sunrise)) {
                                apiUrl = renderSunriseSunsetApiUrl(latitude, longitude, clientTzid, true);
                                res = await axios.get<SunriseSunsetApiResponse>(apiUrl);
                                if (res.data.status !== 'OK') {
                                    throw new Error(`Response error: ${res.data.status}`);
                                }
                                sunrise = res.data.results.sunrise;
                                sunset = res.data.results.sunset;
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
