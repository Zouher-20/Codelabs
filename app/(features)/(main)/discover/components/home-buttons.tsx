import { Icon } from '@iconify/react/dist/iconify.js';
import { MouseEventHandler } from 'react';

export default function HomeButtons({
    title,
    subTitle,
    color,
    icon,
    onButtonClick
}: {
    title: string;
    subTitle: string;
    color: string;
    icon: string;
    onButtonClick: MouseEventHandler<HTMLDivElement>;
}) {
    const borderColor = `border-${color}`;
    return (
        <div
            onClick={onButtonClick}
            className="flex min-w-80 cursor-pointer justify-center rounded-2xl border-2 border-base-100 bg-base-200 p-5"
        >
            <div className={`${borderColor} border-1 flex items-center rounded-md border-2 p-3`}>
                <Icon icon={icon} className={`size-14 text-${color}`} />
            </div>
            <div className="w-3"></div>
            <div className="flex flex-col justify-center">
                <p className={`text-${color} text-xl`}>{title}</p>
                <p className="text-sm">{subTitle}</p>
            </div>
        </div>
    );
}
