import { InteractionType } from '@/app/@types/Interaction';
import IconRenderer from '@/app/components/globals/icon';

export default function Interaction({
    icon,
    number,
    style,
    key,
    onClick,
    isSelected
}: InteractionType) {
    return (
        <section
            key={key}
            className="flex gap-1 rounded-md bg-base-100 p-2 hover:cursor-pointer"
            onClick={onClick}
        >
            <IconRenderer
                className={`self-center ${isSelected ? style : ''}`}
                fontSize={16}
                icon={icon}
            />
            <p>{number}</p>
        </section>
    );
}
