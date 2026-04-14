import { useSelector, useDispatch } from "react-redux";
import { updateClock, ClockState } from "@/features/clock/clockSlice";
import { RootState, AppDispatch } from "../store";
import { DayOfWeek, Month } from "@/utils/enums";
import { renderCurrentDate, renderPlanetaryHour } from "@/utils/utils";

export default function PlanetaryHourDisplay() {
    const { currentDate, currentHour } = useSelector<RootState, ClockState>(state => state.clock);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            {
                currentDate && currentHour && (
                    <div>
                        <div>{renderCurrentDate(currentDate)}</div>
                        <div>{renderPlanetaryHour(currentHour)}</div>
                    </div>
                )
            }
        </>
    )
}
