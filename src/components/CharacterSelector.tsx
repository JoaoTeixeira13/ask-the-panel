"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { characters } from "@/lib/characters";
import { CharacterId } from "@/types/characters";
import { Tooltip } from "./Tooltip";

interface CharacterSelectorProps {
    selectedCharacter: CharacterId;
    onSelect: (id: CharacterId) => void;
}

export function CharacterSelector({
    selectedCharacter,
    onSelect,
}: CharacterSelectorProps) {
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

    return (
        <>
            <p className="font-semibold mt-2 mb-4 text-center text-luxury">
                Choose your advisor
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 justify-items-center">
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
                                <div
                                    className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                                        isSelected
                                            ? "border-coral shadow-md shadow-coral/80 scale-105 border-6"
                                            : "border-muted group-hover:border-coral group-hover:scale-105"
                                    }`}
                                >
                                    <Image
                                        src={character.image}
                                        alt={character.name}
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="text-sm font-semibold mt-3 mb-3 text-center text-luxury">
                                    {character.name}
                                </div>
                                {quote && (
                                    <div className="text-xs italic text-muted text-center mt-1 px-2">
                                        {`"${quote}"`}
                                    </div>
                                )}
                            </button>
                        </Tooltip>
                    );
                })}
            </div>
        </>
    );
}
