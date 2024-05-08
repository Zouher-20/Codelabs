import IconRenderer from '@/app/components/globals/icon';
import { DirectoryNode } from '@webcontainer/api';
import { useState } from 'react';
import FileTree from './file-tree';

export default function FolderItem({ name, node }: { name: string; node: DirectoryNode }) {
    const [isOpen, setOpen] = useState(false);
    const changeOpenState = () => {
        setOpen(!isOpen);
    };
    return (
        <details>
            <summary onClick={changeOpenState} className="flex select-none items-center gap-2">
                <IconRenderer
                    className="text-secondary"
                    icon={isOpen ? 'solar:folder-open-bold-duotone' : 'solar:folder-bold-duotone'}
                />
                {name}
            </summary>
            <div>
                <FileTree tree={node.directory} />
            </div>
        </details>
    );
}
