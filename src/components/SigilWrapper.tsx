import { SIGIL_COLORS } from "@/constants";
import PlanetarySigil from "@/types/PlanetarySigil";

export default function SigilWrapper({ sigil, isLarge = false }: { sigil: PlanetarySigil, isLarge?: boolean }) {
    const sigilColorClass = SIGIL_COLORS[sigil];
    const sigilSize = isLarge ? "text-3xl h-14 w-14" : "text-2xl h-10 w-10"

    return (
        <span className={`${sigilColorClass} ${sigilSize} text-astral font-black inline-flex items-center justify-center rounded-full leading-none shadow`}>
            {sigil}
        </span>
    );
}
