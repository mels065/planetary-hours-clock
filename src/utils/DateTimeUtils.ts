type DateTimeUtilsOptions = {
    millisecondOffset?: number;
    dayOffset?: number;
};

export default class DateTimeUtils {
    public static getCurrentDateTime(): Date {
        return new Date();
    }

    public static createDateFromTimestamp(timestamp: string, opts?: DateTimeUtilsOptions): Date {
        const date = new Date(timestamp);
        if (opts?.millisecondOffset) {
            date.setTime(date.getTime() + opts.millisecondOffset);
        }
        if (opts?.dayOffset) {
            date.setDate(date.getDate() + opts.dayOffset);
        }
        return date;
    }

    public static isNewDay(sunriseTimestamp: string): boolean {
        const currentDate = DateTimeUtils.getCurrentDateTime();

        const oneDayLaterFromSunrise = DateTimeUtils.createDateFromTimestamp(sunriseTimestamp, { dayOffset: 1 });

        return currentDate >= oneDayLaterFromSunrise;
    }
}
