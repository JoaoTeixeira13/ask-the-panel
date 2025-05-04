import React from "react";

type LoadingSpinnerProps = {
    loading: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
    return (
        <div className="h-12 flex justify-center items-center mt-3 mb-3">
            {loading && (
                <img
                    src="images/coral.png"
                    alt="Loading..."
                    className="h-12 w-12 animate-spin rounded-full border border-dotted border-accent"
                />
            )}
        </div>
    );
};
