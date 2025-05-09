"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { characters } from "@/lib/characters";
import { CharacterId } from "@/types/characters";
import { Tooltip } from "./Tooltip";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

type CharacterSelectorProps = {
    selectedCharacter: CharacterId;
    onSelect: (id: CharacterId) => void;
};

export function CharacterSelector({
    selectedCharacter,
    onSelect,
}: CharacterSelectorProps) {
    const isMobile = useMediaQuery("(max-width: 640px)");

    const [quotes, setQuotes] = useState<Record<CharacterId, string>>({
        heiress: "",
        priest: "",
        tarot: "",
        bro: "",
    });

    useEffect(() => {
        const quoteMap: Record<CharacterId, string> = {
            heiress: "",
            priest: "",
            tarot: "",
            bro: "",
        };

        characters.forEach((character) => {
            quoteMap[character.id] =
                character.quotes[
                    Math.floor(Math.random() * character.quotes.length)
                ];
        });
        setQuotes(quoteMap);
    }, []);

    const getAvatarClass = (isSelected: boolean) => {
        const base = "rounded-full overflow-hidden transition-all duration-300";
        const size = isMobile ? "w-18 h-18" : "w-24 h-24";
        const border = isSelected
            ? "border-6 border-coral shadow-md shadow-coral/80 scale-105"
            : "border-4 border-muted group-hover:border-darkCoral group-hover:scale-105";

        return `${base} ${size} ${border}`;
    };

    return (
        <div className="grid justify-items-center bg-background rounded-xl p-2 grid-cols-4 gap-6">
            {characters.map((character) => {
                const isSelected = selectedCharacter === character.id;
                const quote = quotes[character.id];

                return (
                    <Tooltip key={character.id} content={character.tooltip}>
                        <button
                            key={character.id}
                            type="button"
                            onClick={() => onSelect(character.id)}
                            className="flex flex-col items-center group relative animate-fade-in"
                        >
                            <div className={getAvatarClass(isSelected)}>
                                <Image
                                    src={character.image}
                                    alt={character.name}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div
                                className={`text-sm font-semibold text-center text-luxury ${
                                    !isMobile ? "mt-3 mb-3" : "mt-2 mb-2"
                                }`}
                            >
                                {character.name}
                            </div>
                            {quote && !isMobile && (
                                <div className="text-xs italic text-muted text-center mt-1 px-2">
                                    {`"${quote}"`}
                                </div>
                            )}
                        </button>
                    </Tooltip>
                );
            })}
        </div>
    );
}
