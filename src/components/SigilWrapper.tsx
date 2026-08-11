import { SIGIL_COLORS } from "@/constants";
import PlanetarySigil from "@/types/PlanetarySigil";

export default function SigilWrapper({ sigil, isLarge = false }: { sigil: PlanetarySigil, isLarge?: boolean }) {
    const sigilColorClass = SIGIL_COLORS[sigil];
    const sigilSize = isLarge ? "md:text-3xl md:h-14 md:w-14" : "md:text-2xl md:h-10 md:w-10"

    return (
        <span className={`${sigilColorClass} ${sigilSize} text-sm h-5 w-5 text-astral font-black inline-flex items-center justify-center rounded-full leading-none shadow`}>
            {sigil}
        </span>
    );
}
