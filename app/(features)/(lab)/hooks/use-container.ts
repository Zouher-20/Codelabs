export enum PackageManagerType {
    NPM = 'npm',
    Yarn = 'yarn',
    PNPM = 'pnpm'
}
import GlobalUtils from '@/app/utils/global-utils';
import { FileNode, FileSystemTree, WebContainer } from '@webcontainer/api';
import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';

export function useContainer(projectFiles: FileSystemTree) {
    const [booting, setBooting] = useState(false);
    const [isBooted, setIsBooted] = useState(false);
    const [mounting, setMounting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [installingDeps, setInstallingDeps] = useState(false);
    const [depsInstalled, setDepsInstalled] = useState(false);
    const [runningServer, setRunningServer] = useState(false);
    const [serverReady, setServerReady] = useState(false);
    const [editor, setEditor] = useState('');

    let webcontainerInstance = useRef<WebContainer>();
    let terminalInstance = useRef<Terminal>();

    async function bootContainer() {
        try {
            if (isBooted) {
                throw 'web container is already booted';
            }
            const terminalEl: HTMLDivElement | null = document.querySelector('#terminal');
            if (terminalEl && GlobalUtils.isNullOrUndefined(terminalInstance.current)) {
                terminalInstance.current = new Terminal({
                    convertEol: true
                });
                terminalInstance.current.open(terminalEl);
            } else {
                throw 'Terminal element error';
            }
            webcontainerInstance.current = await WebContainer.boot().then(container => {
                setIsBooted(true);
                return container;
            });

            return Promise.resolve();
        } catch (err) {
            console.warn('__ CONTAINER ERROR __ : ' + err);
            return Promise.reject();
        }
    }

    async function mountFiles() {
        try {
            if (!webcontainerInstance.current) {
                throw 'no web container booted';
            }

            await webcontainerInstance.current.mount(projectFiles);
            const indexjs = (projectFiles['package.json'] as FileNode).file.contents;
            setEditor(indexjs as string);
        } catch (err) {
            console.warn('__ CONTAINER ERROR __ : ' + err);
        }
    }

    async function installDependancies(pkgManagerType: PackageManagerType) {
        try {
            if (!webcontainerInstance.current) {
                throw 'no web container booted';
            }
            let pkgManagerAsString = '';
            let paramsArray: string[] = [];
            switch (pkgManagerType) {
                case 'npm':
                    pkgManagerAsString = 'npm';
                    paramsArray = ['install'];
                    break;
                case 'yarn':
                    pkgManagerAsString = 'yarn';
                    break;
                case 'pnpm':
                    pkgManagerAsString = 'pnpm';
                    paramsArray = ['install'];
                    break;
                default:
                    pkgManagerAsString = 'npm';
                    break;
            }
            const installProcess = await webcontainerInstance.current.spawn(
                pkgManagerAsString,
                paramsArray
            );
            // TODO: change this
            installProcess.output.pipeTo(
                new WritableStream({
                    write(data) {
                        terminalInstance.current?.write(data);
                    }
                })
            );

            return installProcess.exit;
        } catch (err) {
            return -1;
        }
    }

    async function runDevServer(scriptName: string = 'start') {
        try {
            if (!webcontainerInstance.current) {
                throw 'no web container booted';
            }
            const runProcess = await webcontainerInstance.current.spawn('npm', ['run', scriptName]);
            runProcess.output.pipeTo(
                new WritableStream({
                    write(data) {
                        terminalInstance.current?.write(data);
                    }
                })
            );
            webcontainerInstance.current.on('server-ready', (port, url) => {
                const iframeEl: HTMLIFrameElement | null =
                    document.querySelector('#lab-preview-iframe');
                if (iframeEl) {
                    iframeEl.src = url;
                }
            });
        } catch (err) {}
    }
    useEffect(() => {
        const setupContainer = async () => {
            if (!webcontainerInstance.current) {
                await bootContainer().then(async () => {
                    await mountFiles().then(async () => {
                        setIsMounted(true);
                        const pkgManagerType = PackageManagerType.NPM;
                        await installDependancies(pkgManagerType).then(async code => {
                            if (code === 0) {
                                await runDevServer();
                            }
                        });
                    });
                });
            }
        };

        setupContainer();
    });

    return {
        webcontainerInstance,
        booting,
        isBooted,
        mounting,
        isMounted,
        installingDeps,
        depsInstalled,
        runningServer,
        serverReady,
        editor,
        setEditor
    };
}
