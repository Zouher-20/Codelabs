'use client';

import CodeLabContainer from '@/app/(features)/(main)/classes/components/container';
import { classType } from '@/app/@types/class';
import { getClassCreateByMe, getMyClass } from '@/app/api/(modules)/class-room/services/action';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClassesList from './components/class-list-container';
import CreateClassContainer from './components/create-button-container';
import InfoContainer from './components/info-container';
import NewClassModal from './components/new-class-modal';

export default function LabsPage() {
    const [createdClassLoading, setCreatedClassLoading] = useState(false);
    const [createdClassError, setCreatedClassError] = useState(null);
    const [createdClass, setCreatedClass] = useState<Array<classType>>([]);

    const [myClassLoading, setMyClassLoading] = useState(false);
    const [myClassError, setMyClassError] = useState(null);
    const [myClass, setMyClass] = useState<Array<classType>>([]);

    const route = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        getMyClassFromServer();
        getCreatedClass();
    };

    const getMyClassFromServer = async () => {
        setMyClassLoading(true);
        setMyClassError(null);
        try {
            const res = await getMyClass({ page: 1, pageSize: 10 });
            setMyClass(
                res.classes.map<classType>(e => {
                    return {
                        id: e.id,
                        title: e.name,
                        description: e.description,
                        type: e.type
                    };
                })
            );
        } catch (e: any) {
            setMyClassError(e.message);
        } finally {
            setMyClassLoading(false);
        }
    };
    const getCreatedClass = async () => {
        setCreatedClassLoading(true);
        setCreatedClassError(null);
        try {
            const res = await getClassCreateByMe({ page: 1, pageSize: 10 });
            setCreatedClass(
                res.classes.map<classType>(e => {
                    return {
                        id: e.id,
                        title: e.name,
                        description: e.description,
                        type: e.type
                    };
                })
            );
        } catch (e: any) {
            setCreatedClassError(e.message);
        } finally {
            setCreatedClassLoading(false);
        }
    };
    const handleClassClick = (currentClass: classType) => {
        const params = {
            id: currentClass.id.toString()
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/classes/statistics' + '?' + queryString);
        return;
    };
    const handleMyClassClick = (currentClass: classType) => {
        const params = {
            id: currentClass.id.toString()
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/classes/students' + '?' + queryString);
        return;
    };
    return (
        <div className="flex min-h-[550px] flex-col items-center justify-center ">
            <div className="flex w-full flex-col gap-2 p-3">
                <div className="flex w-full flex-1 flex-wrap gap-2">
                    <CreateClassContainer
                        onClick={() => {
                            if (document) {
                                (
                                    document.getElementById('new-class-modal') as HTMLFormElement
                                )?.showModal();
                            }
                        }}
                    />
                    <ManageState
                        customLoadingPage={
                            <CodeLabContainer height={'19rem'} minWidth="64">
                                <LoadingState />
                            </CodeLabContainer>
                        }
                        customEmptyPage={<></>}
                        loading={createdClassLoading}
                        error={createdClassError}
                        errorAndEmptyCallback={() => {
                            getCreatedClass();
                        }}
                        loadedState={
                            <ClassesList
                                classes={createdClass}
                                title="Classes Created"
                                onClick={handleClassClick}
                            />
                        }
                        empty={createdClass.length == 0}
                    />
                    <ManageState
                        customLoadingPage={
                            <CodeLabContainer height={'19rem'} minWidth="64">
                                <LoadingState />
                            </CodeLabContainer>
                        }
                        customEmptyPage={<></>}
                        loading={myClassLoading}
                        error={myClassError}
                        errorAndEmptyCallback={() => {
                            getMyClassFromServer();
                        }}
                        loadedState={
                            <ClassesList
                                classes={myClass}
                                title="Classes joined"
                                onClick={handleMyClassClick}
                            />
                        }
                        empty={myClass.length == 0}
                    />
                </div>
                <InfoContainer />
            </div>

            <NewClassModal
                onClassAddedCallback={() => {
                    fetchData();
                    toast.success('class added successfully');
                }}
            />
            <CustomToaster />
        </div>
    );
}
