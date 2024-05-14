import IconRenderer from '@/app/components/globals/icon';

export default function EditorToolbar() {
    return (
        <div className="col-span-2 flex items-center gap-2 px-2 py-1 text-2xl">
            <div className="tooltip tooltip-bottom" data-tip="Save">
                <IconRenderer
                    className="cursor-pointer text-info"
                    icon="solar:diskette-bold-duotone"
                />
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Reboot Container">
                <IconRenderer
                    className="cursor-pointer text-primary"
                    icon="solar:refresh-circle-line-duotone"
                />
            </div>
        </div>
    );
}
