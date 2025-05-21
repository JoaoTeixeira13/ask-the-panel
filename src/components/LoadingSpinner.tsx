import Image from "next/image";

type LoadingSpinnerProps = {
    loading: boolean;
};

export const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
    return (
        <div className="h-12 flex justify-center items-center mt-1 mb-1">
            {loading && (
                <Image
                    src="/images/coral.png"
                    alt="Loading..."
                    width={24}
                    height={24}
                    className="animate-spin rounded-full border border-dotted border-accent"
                />
            )}
        </div>
    );
};
