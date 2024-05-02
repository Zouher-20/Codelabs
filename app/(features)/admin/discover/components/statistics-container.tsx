import { Icon } from '@iconify/react/dist/iconify.js';

export function AdminDiscoverStatisticsComponent({
    text,
    value,
    icon
}: {
    text: string;
    value: number;
    icon: string;
}) {
    return (
        <div className="flex w-44 gap-2 rounded-2xl bg-base-300 p-3">
            <div className="rounded-lg bg-base-200 p-2">
                <Icon
                    icon="solar:square-academic-cap-bold-duotone"
                    className="size-10 text-primary"
                />
            </div>
            <div className="flex flex-col justify-center">
                <p>{text}</p>
                <p className="text-sm text-gray-400">{value}</p>
            </div>
        </div>
    );
}
