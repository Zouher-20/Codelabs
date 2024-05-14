import IconRenderer from '@/app/components/globals/icon';
import { SwalUtil } from '@/app/utils/swal-util';
import { FileNode } from '@webcontainer/api';
import { useContext } from 'react';
import { PathContext } from './path-context';
import { TreeReducerActionType, useTreeDispatch } from './tree-context';

export default function FileItem({ name, node }: { name: string; node: FileNode }) {
    const dispatch = useTreeDispatch();
    const path = useContext(PathContext);

    const activateFile = () => {
        if (dispatch)
            dispatch({
                type: TreeReducerActionType.FILE_ACTIVATE,
                payload: [...path, name]
            });
    };
    const handleDelete: CallableFunction = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        SwalUtil.showConfirm(() => {
            if (dispatch)
                dispatch({ type: TreeReducerActionType.NODE_DELETE, payload: [...path, name] });
        });
    };
    return (
        <>
            <div
                onClick={activateFile}
                className="node-item flex select-none items-center gap-2 hover:underline"
            >
                <IconRenderer className="text-info" icon="solar:file-bold-duotone" />
                {name}
                <div className="action-btns ml-auto gap-1">
                    <IconRenderer
                        onClick={handleDelete}
                        className="cursor-pointer text-error"
                        icon="solar:trash-bin-minimalistic-bold"
                    />
                </div>
            </div>
        </>
    );
}
