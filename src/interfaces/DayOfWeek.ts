import DayOfWeekName from "@/enums/DayOfWeekName";
import PlanetaryInfo from "@/models/PlanetaryInfo";

interface DayOfWeek {
    name: DayOfWeekName;
    planet: PlanetaryInfo;
}

export default DayOfWeek;
