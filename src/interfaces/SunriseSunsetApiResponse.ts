interface SunriseSunsetApiResponse {
    results: {
        sunrise: string;
        sunset: string;
    },
    status: "OK" | "INVALID_REQUEST" | "INVALID_DATE" | "UNKNOWN_ERROR" | "INVALID_TZID"
}

export default SunriseSunsetApiResponse;
