import PlanetaryDate from "../PlanetaryDate";
import PlanetaryHour from "../PlanetaryHour";

interface ClockState  {
    currentDate: PlanetaryDate | null;
    currentHour: PlanetaryHour | null,
    dayHours: PlanetaryHour[],
    nightHours: PlanetaryHour[],
}

export default ClockState;
