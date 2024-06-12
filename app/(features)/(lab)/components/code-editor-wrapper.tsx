import CodeEditor from './code-editor';
import { useTree } from './tree-context';

export default function CodeEditorWrapper() {
    const treeState = useTree();
    return <CodeEditor files={treeState.nodes} />;
}
