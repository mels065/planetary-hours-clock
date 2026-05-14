import { useState, useEffect } from "react";
import { SunriseSunsetApiResponse } from "@/utils/interfaces";
import { renderSunriseSunsetApiUrl } from "@/utils/utils";
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
            const savedSunriseData: string | null = localStorage.getItem('sunriseTimestamp');
            const savedSunsetData: string | null = localStorage.getItem('sunsetTimestamp');

            if ((!savedSunriseData || savedSunriseData.length === 0) || (!savedSunsetData || savedSunsetData.length === 0)) {
                navigator.geolocation.getCurrentPosition(async position => {
                        const { coords: { latitude, longitude } } = position;

                        const apiUrl = renderSunriseSunsetApiUrl(latitude, longitude);
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
