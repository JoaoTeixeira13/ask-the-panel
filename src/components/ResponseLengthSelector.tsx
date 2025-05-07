"use client";
import { ResponseLength } from "@/types/responseLength";

interface ResponseLengthSelectorProps {
    value: ResponseLength;
    onChange: (length: ResponseLength) => void;
}

export function ResponseLengthSelector({
    value,
    onChange,
}: ResponseLengthSelectorProps) {
    return (
        <>
            <p className="font-semibold mt-2 mb-4 text-center text-luxury">
                Choose how much they say{" "}
            </p>
            <div className="mb-6 flex justify-center">
                <div className="flex border border-accent rounded-full overflow-hidden text-sm">
                    <button
                        type="button"
                        onClick={() => onChange(ResponseLength.Short)}
                        className={`px-4 py-2 text-primary ${
                            value === ResponseLength.Short
                                ? "bg-luxury"
                                : "bg-accent"
                        }`}
                    >
                        Short answer
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange(ResponseLength.Long)}
                        className={`px-4 py-2 text-primary ${
                            value === ResponseLength.Long
                                ? "bg-luxury"
                                : "bg-accent"
                        }`}
                    >
                        Long answer
                    </button>
                </div>
            </div>
        </>
    );
}
