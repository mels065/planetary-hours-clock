import { useState, useEffect } from "react";
import { SunriseSunsetApiResponse } from "@/utils/interfaces";
import { renderSunriseSunsetApiUrl } from "@/utils/utils";
import axios from "axios";


type SunriseSunset = {
    sunrise: Date | null,
    sunset: Date | null
}

export default function useSunriseAndSunset(): SunriseSunset {
    const [sunrise, setSunrise] = useState<Date | null>(null);
    const [sunset, setSunset] = useState<Date | null>(null);

    useEffect(() => {
        (async () => {
            const savedSunriseData: string | null = localStorage.getItem('sunrise');
            const savedSunsetData: string | null = localStorage.getItem('sunset');

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
                                sunrise: sunriseTimestamp,
                                sunset: sunsetTimestamp
                            } = res.data.results;
                            const sr = new Date(sunriseTimestamp);
                            const ss = new Date(sunsetTimestamp);

                            localStorage.setItem('sunrise', JSON.stringify(sr));
                            localStorage.setItem('sunset', JSON.stringify(ss));
                            
                            setSunrise(sr);
                            setSunset(ss);
                        } catch (err) {
                            throw err;
                        }
                    })
            } else {
                setSunrise(JSON.parse(savedSunriseData) as Date);
                setSunset(JSON.parse(savedSunsetData) as Date);
            }
        })();
    }, []);

    return { sunrise, sunset } as SunriseSunset;
}
