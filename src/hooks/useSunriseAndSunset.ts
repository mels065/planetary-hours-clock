import { Planet } from "@/utils/enums";
import { DAYS_OF_WEEK } from "@/utils/constants";

export default function useSunriseAndSunset() {
    /* TODO: 1. Check if data in localstorage is current to the day, meaning that:
                - It is currently the same day as the day saved in localstore.
                - It is the next day, but it is before sunrise.
                If none of these conditions are met, the data will need to be updated with an API call
            2. If changed, set new sunrise, sunset, and day, and return data
    */
}
