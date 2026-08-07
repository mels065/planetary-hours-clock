export function renderSunriseSunsetApiUrl(lat: number, lon: number, tzid: string, getYesterday?: boolean): string {
    let apiString = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0&tzid=${tzid}`;
    if (getYesterday) {
        apiString += "&date=yesterday";
    }
    return apiString;
}
