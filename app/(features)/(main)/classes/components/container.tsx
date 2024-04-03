export default function CodeLabContainer({
    height,
    children,
    minWidth = '52'
}: {
    height?: string;
    children?: React.ReactNode;
    minWidth?: string;
}) {
    return (
        <div
            className={`flex min-h-60 min-w-${minWidth} flex-1 rounded-lg bg-base-300`}
            style={{ height }}
        >
            {children}
        </div>
    );
}
