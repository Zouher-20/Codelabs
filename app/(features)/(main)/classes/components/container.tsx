export default function CodeLabContainer({
    height,
    children
}: {
    height?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex min-h-52 min-w-60 flex-1 rounded-lg bg-base-300" style={{ height }}>
            {children}
        </div>
    );
}
