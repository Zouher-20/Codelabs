import IconRenderer from '@/app/components/globals/icon';
import { TreeReducerActionType, useTreeDispatch } from './tree-context';

export default function EditorToolbar({ dirty }: { dirty: boolean }) {
    const dispatch = useTreeDispatch();
    const onSaveClicked = () => {
        if (dispatch) dispatch({ type: TreeReducerActionType.SYNC_LAB });
    };
    return (
        <div className="col-span-2 flex items-center gap-2 border-b border-base-100 bg-base-300 px-2 py-1 text-2xl">
            {dirty ? (
                <div className="tooltip tooltip-bottom" data-tip="Save">
                    <IconRenderer
                        onClick={onSaveClicked}
                        className="cursor-pointer text-info hover:opacity-75"
                        icon="solar:diskette-bold-duotone"
                    />
                </div>
            ) : (
                <div className="tooltip tooltip-bottom" data-tip="Save">
                    <IconRenderer className="text-gray-400" icon="solar:diskette-bold-duotone" />
                </div>
            )}

            <div className="tooltip tooltip-bottom" data-tip="Reboot Container">
                <IconRenderer
                    className="cursor-pointer text-primary hover:opacity-75"
                    icon="solar:refresh-circle-line-duotone"
                />
            </div>
        </div>
    );
}
