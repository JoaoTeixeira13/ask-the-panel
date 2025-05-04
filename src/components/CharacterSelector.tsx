"use client";
import { CharacterId } from "@/types/characters";

interface CharacterSelectorProps {
    characters: { id: CharacterId; label: string }[];
    selectedCharacter: CharacterId;
    onSelect: (id: CharacterId) => void;
}

export function CharacterSelector({
    characters,
    selectedCharacter,
    onSelect,
}: CharacterSelectorProps) {
    return (
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
            {characters.map((character) => (
                <button
                    type="button"
                    key={character.id}
                    onClick={() => onSelect(character.id)}
                    className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                        selectedCharacter === character.id
                            ? "bg-luxury text-primary"
                            : "bg-accent border-muted text-primary hover:bg-luxury hover:text-primary"
                    }`}
                >
                    {character.label}
                </button>
            ))}
        </div>
    );
}
