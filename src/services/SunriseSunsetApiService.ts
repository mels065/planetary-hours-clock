import axios from "axios";

import SunriseSunsetApiResponse from "@/interfaces/SunriseSunsetApiResponse";

type SunriseSunsetApiOpts = {
    lat: number;
    lon: number;
    tzid: string;
    getYesterday?: boolean;
}

export default class SunriseSunsetApiService {
    private static readonly BASE_URL = "https://api.sunrise-sunset.org/json";

    public static async fetchSunriseSunsetData(opts: SunriseSunsetApiOpts): Promise<SunriseSunsetApiResponse> {
        const apiUrl = this.renderApiUrl(opts);
        const response = await axios.get(apiUrl);
        return response.data;
    }

    private static renderApiUrl(opts: SunriseSunsetApiOpts): string {
        const { lat, lon, tzid, getYesterday } = opts;
        let apiString = `${this.BASE_URL}?lat=${lat}&lng=${lon}&formatted=0&tzid=${tzid}`;
        if (getYesterday) {
            apiString += "&date=yesterday";
        }
        return apiString;
    }
}
