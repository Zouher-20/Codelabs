import IconRenderer from '@/app/components/globals/icon';
import { SwalUtil } from '@/app/utils/swal-util';
import { DirectoryNode } from '@webcontainer/api';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import FileTree from './file-tree';
import PathContextProvider, { PathContext } from './path-context';
import { TreeReducerActionType, useTreeDispatch } from './tree-context';

export default function FolderItem({ name, node }: { name: string; node: DirectoryNode }) {
    const [isOpen, setOpen] = useState(false);
    const path = useContext(PathContext);
    const dispatch = useTreeDispatch();
    const changeOpenState = () => {
        setOpen(!isOpen);
        if (dispatch && name !== 'root')
            dispatch({
                type: TreeReducerActionType.FOLDER_ACTIVATE,
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
    const handleFolderAdd: CallableFunction = async (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        Swal.fire({
            background: '#171818',
            color: '#f2f2f2',
            input: 'text',
            confirmButtonText: 'Create',
            inputLabel: 'File Name',
            inputPlaceholder: 'example.js',
            confirmButtonColor: '#282C2B',
            inputValidator: result => !result && 'Type the folder name'
        }).then(result => {
            if (result.isConfirmed && !result.isDismissed) {
                dispatch &&
                    dispatch({
                        type: TreeReducerActionType.FOLDER_CREATE,
                        payload: [...path, name, result.value]
                    });
            }
        });
    };
    const handleFileAdd: CallableFunction = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        Swal.fire({
            background: '#171818',
            color: '#f2f2f2',
            input: 'text',
            confirmButtonText: 'Create',
            inputLabel: 'File Name',
            inputPlaceholder: 'example.js',
            confirmButtonColor: '#282C2B'
        }).then(result => {
            if (result.isConfirmed && !result.isDismissed) {
                dispatch &&
                    dispatch({
                        type: TreeReducerActionType.FILE_CREATE,
                        payload: [...path, name, result.value]
                    });
            }
        });
    };

    return (
        <PathContextProvider value={name === 'root' ? path : [...path, name]}>
            <details>
                <summary
                    className="node-item flex w-full select-none items-center gap-2 px-0.5 hover:bg-base-300  hover:underline"
                    onClick={changeOpenState}
                >
                    <IconRenderer
                        className="text-secondary"
                        icon={
                            isOpen ? 'solar:folder-open-bold-duotone' : 'solar:folder-bold-duotone'
                        }
                    />
                    {name}
                    <div className="action-btns ml-auto gap-1">
                        <IconRenderer
                            onClick={handleFileAdd}
                            className="cursor-pointer text-success"
                            icon="solar:add-circle-bold"
                        />
                        <IconRenderer
                            onClick={handleFolderAdd}
                            className="cursor-pointer text-success"
                            icon="solar:add-folder-bold"
                        />
                        <IconRenderer
                            onClick={handleDelete}
                            className="cursor-pointer text-error"
                            icon="solar:trash-bin-minimalistic-bold"
                        />
                    </div>
                </summary>
                <div>
                    <FileTree tree={node.directory} />
                </div>
            </details>
        </PathContextProvider>
    );
}
