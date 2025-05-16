"use client";
import { DEFAULT_MOBILE_MEDIA_QUERY } from "@/lib/constants";
import { useState, useEffect } from "react";

export const useMediaQuery = (query = DEFAULT_MOBILE_MEDIA_QUERY) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const updateMatch = () => setMatches(media.matches);
        updateMatch();

        media.addEventListener("change", updateMatch);
        return () => media.removeEventListener("change", updateMatch);
    }, [query]);

    return matches;
};
