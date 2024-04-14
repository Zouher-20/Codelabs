import { Icon } from '@iconify/react/dist/iconify.js';
import CodeLabContainer from '../../components/container';

export default function ClassDescriptionComponent({
    className,
    classDescription,
    classType
}: {
    classType: string;
    className: string;
    classDescription: string;
}) {
    return (
        <div className="w-full">
            <CodeLabContainer>
                <div className="flex flex-col justify-center p-5">
                    <p className="text-lg font-bold">{className}</p>
                    <div className="flex items-center py-2">
                        <Icon icon="solar:bookmark-circle-broken" />
                        <div className="w-1"></div>
                        <p className="text-xs">{classType}</p>
                    </div>
                    <p>
                        {classDescription}
                    </p>
                </div>
            </CodeLabContainer>
        </div>
    );
}
