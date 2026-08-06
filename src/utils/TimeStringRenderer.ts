import { staticImplements } from "@/decorators";

// Interfaces
import DisplayTextRenderer from "@/interfaces/DisplayTextRenderer";

import MeridiemIndicator from "@/types/MeridiemIndicator";

@staticImplements<DisplayTextRenderer<Date>>()
export default class TimeStringRenderer {
    public static render(date: Date): string {
        let hour = date.getHours();
        const minutes = date.getMinutes();

        let period: MeridiemIndicator = "am";

        if (hour === 0) {
            hour = 12;
        } else if (hour >= 12) {
            period = "pm";
            if (hour > 12) {
                hour -= 12;
            }
        }

        return `${hour}:${minutes.toString().padStart(2, "0")}${period}`;
    }
}
