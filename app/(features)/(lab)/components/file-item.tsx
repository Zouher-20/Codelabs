import IconRenderer from '@/app/components/globals/icon';
import { FileNode } from '@webcontainer/api';

export default function FileItem({ name, node }: { name: string; node: FileNode }) {
    return (
        <>
            <div className="flex select-none items-center gap-2 hover:underline">
                <IconRenderer className="text-info" icon="solar:file-bold-duotone" />
                {name}
            </div>
        </>
    );
}
