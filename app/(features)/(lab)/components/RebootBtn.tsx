'use client';
import IconRenderer from '@/app/components/globals/icon';
import { useRouter } from 'next/navigation';

export default function RebootBtn() {
    const router = useRouter();
    const onRebootClicked = () => {
        window.location.reload();
    };
    return (
        <button onClick={onRebootClicked} className="btn btn-primary btn-sm font-bold">
            <IconRenderer
                className="cursor-pointer text-[1.1rem] hover:opacity-75"
                icon="solar:play-bold"
            />
            Reboot
        </button>
    );
}
