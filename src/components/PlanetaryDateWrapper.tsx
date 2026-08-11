import DayOfWeekName from "@/enums/DayOfWeekName";
import Month from "@/enums/Month";
import PlanetaryDate from "@/interfaces/PlanetaryDate";
import SigilWrapper from "./SigilWrapper";
import DateTimeUtils from "@/utils/DateTimeUtils";

export default function PlanetaryDateWrapper({ planetaryDate }: { planetaryDate: PlanetaryDate }) {
    
    const dayOfWeek = DayOfWeekName[planetaryDate.dayOfWeek.name];
    const planetarySigil = planetaryDate.dayOfWeek.planet.sigil;
    const date = DateTimeUtils.createDateFromTimestamp(String(planetaryDate.date));
    const month = Month[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return (
        <div className="font-forum text-moonlight md:text-4xl/22 text-3xl/12 uppercase">
            {`${dayOfWeek}`} <SigilWrapper sigil={planetarySigil} isLarge={true} /> {`${month} ${day}, ${year}`}
        </div>
    );
}
