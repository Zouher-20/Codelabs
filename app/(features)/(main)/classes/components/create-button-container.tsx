import { Icon } from '@iconify/react/dist/iconify.js';
import { MouseEventHandler } from 'react';
import CodeLabContainer from './container';

export default function CreateClassContainer({
    onClick
}: {
    onClick?: MouseEventHandler<HTMLDivElement>;
}) {
    return (
        <CodeLabContainer height={'19rem'}>
            <div
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-4"
                onClick={onClick}
            >
                <div
                    className={`border-1 flex h-24 w-24 items-center justify-center rounded-md border-2 border-primary p-3 `}
                >
                    <Icon
                        icon="solar:square-academic-cap-bold-duotone"
                        className={`size-14 text-primary`}
                    />
                </div>
                <div className="flex w-2/3 flex-col items-center justify-center">
                    <p className="text-center text-primary">Create new classroom</p>
                    <p className="text-center">create new classroom to start your education plan</p>
                </div>
            </div>
        </CodeLabContainer>
    );
}
