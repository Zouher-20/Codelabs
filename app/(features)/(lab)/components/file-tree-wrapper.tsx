import FileTree from './file-tree';
import { useTree } from './tree-context';

export default function FileTreeWrapper() {
    const treeState = useTree();
    return (
        <FileTree
            tree={{
                root: {
                    directory: treeState.nodes
                }
            }}
        />
    );
}
