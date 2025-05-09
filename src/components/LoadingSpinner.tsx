import React from "react";
import Image from "next/image";

type LoadingSpinnerProps = {
    loading: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
    return (
        <div className="h-12 flex justify-center items-center mt-3 mb-3">
            {loading && (
                <Image
                    src="/images/coral.png"
                    alt="Loading..."
                    width={96}
                    height={96}
                    className="animate-spin rounded-full border border-dotted border-accent"
                />
            )}
        </div>
    );
};
