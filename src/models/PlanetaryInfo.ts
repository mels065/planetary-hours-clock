import Planet from "@/enums/Planet"
import PlanetarySigil from "@/types/PlanetarySigil";
import IPlanetaryInfo from "@/interfaces/IPlanetaryInfo";

export default class PlanetaryInfo implements IPlanetaryInfo {
    planet: Planet;
    sigil: PlanetarySigil

    static currentPlanetaryInfo: PlanetaryInfo[] = [];

    constructor(planet: Planet, sigil: PlanetarySigil) {
        this.planet = planet;
        this.sigil = sigil;

        PlanetaryInfo.currentPlanetaryInfo = [
            ...PlanetaryInfo.currentPlanetaryInfo,
            this
        ].sort((a, b) => a.planet - b.planet);
    }

    public static getPlanetaryInfo(planet: Planet): PlanetaryInfo {
        return PlanetaryInfo.currentPlanetaryInfo.find(pi => pi.planet === planet) || PlanetaryInfo.currentPlanetaryInfo[0];
    }

    public static getNumOfPlanets() {
        return PlanetaryInfo.currentPlanetaryInfo.length;
    }

    // Allow ability to alter iteration
    public getNextPlanet(): PlanetaryInfo {
        return PlanetaryInfo.getPlanetaryInfo(((this.planet + 1) % PlanetaryInfo.getNumOfPlanets()) as Planet);
    }
}
