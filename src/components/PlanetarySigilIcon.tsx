import { PlanetarySigil } from "@/utils/types"

export default function PlanetarySigilIcon({ sigil }: { sigil: PlanetarySigil }) {
    const sigilColorMap: Record<PlanetarySigil, string> = {
        "☉": "text-gold",
        "☽": "text-silver",
        "☿": "text-quicksilver",
        "♀": "text-copper",
        "♂": "text-iron",
        "♃": "text-tin",
        "♄": "text-lead",
    };
    
    return (
        <span className={`${sigilColorMap[sigil]}`}>{sigil}</span>
    )
}
