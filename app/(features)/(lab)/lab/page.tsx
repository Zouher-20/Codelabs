'use client';
import 'xterm/css/xterm.css';
import { useContainer } from '../hooks/use-container';
import { files } from './files';

export default function Lab() {
    const { editor, setEditor } = useContainer(files);
    return (
        <div>
            <div className="grid min-h-screen grid-cols-2">
                <div className="editor w-full">
                    <textarea
                        className=" h-full w-full resize-none rounded-lg bg-neutral p-4"
                        value={editor}
                        onChange={event => setEditor(event.target.value)}
                    ></textarea>
                </div>
                <div className="h-full w-full rounded-lg">
                    <iframe
                        id="lab-preview-iframe"
                        className="h-full w-full bg-slate-50"
                        src="loading.html"
                    ></iframe>
                </div>
                <div id="terminal" className=" col-span-2 h-fit"></div>
            </div>
        </div>
    );
}
