import { useState, useEffect } from "react";
import { SunriseSunsetApiResponse } from "@/utils/interfaces";
import { renderSunriseSunsetApiUrl, isNewDay } from "@/utils/utils";
import axios from "axios";


type SunriseSunset = {
    sunriseTimestamp: string,
    sunsetTimestamp: string
}

export default function useSunriseAndSunset(): SunriseSunset {
    const [sunriseTimestamp, setSunriseTimestamp] = useState<string>("");
    const [sunsetTimestamp, setSunsetTimestamp] = useState<string>("");

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

                return isSavedSunriseDataValid() || isSavedSunsetDataValid() || isSavedTzidValid();
            }

            if (IsApiCallNeeded()) {
                navigator.geolocation.getCurrentPosition(async position => {
                        const { coords: { latitude, longitude } } = position;

                        const apiUrl = renderSunriseSunsetApiUrl(latitude, longitude, clientTzid);
                        try {
                            const res = await axios.get<SunriseSunsetApiResponse>(apiUrl);
                            if (res.data.status !== 'OK') {
                                throw new Error(`Response error: ${res.data.status}`)
                            }
                            const {
                                sunrise,
                                sunset,
                            } = res.data.results;

                            localStorage.setItem('sunriseTimestamp', sunrise);
                            localStorage.setItem('sunsetTimestamp', sunset);
                            localStorage.setItem('tzid', clientTzid);
                            
                            setSunriseTimestamp(sunrise);
                            setSunsetTimestamp(sunset);
                        } catch (err) {
                            throw err;
                        }
                    })
            } else {
                setSunriseTimestamp(savedSunriseData);
                setSunsetTimestamp(savedSunsetData);
            }
        })();
    }, []);

    return { sunriseTimestamp, sunsetTimestamp } as SunriseSunset;
}
