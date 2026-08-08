import IPlanetaryInfo from "./IPlanetaryInfo";

interface PlanetaryHour {
    startTime: Date;
    endTime: Date;
    planet: IPlanetaryInfo;
}

export default PlanetaryHour;
