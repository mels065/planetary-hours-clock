import { PlanetarySigil } from "@/utils/types"

type SigilSize = "md" | "lg";

export default function PlanetarySigilIcon({ sigil, size="md" }: { sigil: PlanetarySigil, size?: SigilSize }) {
    const sigilColorMap: Record<PlanetarySigil, string> = {
        "☉": "gold",
        "☽": "silver",
        "☿": "quicksilver",
        "♀": "copper",
        "♂": "iron",
        "♃": "tin",
        "♄": "lead",
    };
    const sizeMap: Record<SigilSize, string> = {
        "md": "2xl",
        "lg": "3xl"
    }
    
    return (
        <span className={`text-${sizeMap[size]} text-${sigilColorMap[sigil]}`}>{sigil}</span>
    )
}
