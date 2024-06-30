'use client';

import { LabTableType } from '@/app/(features)/admin/(admin-feature)/discover/components/lab-table';
import {
    getTrendingUserProjectsLab,
    getUserProjectsLab
} from '@/app/api/(modules)/user-project/services/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import HomeButtons from './components/home-buttons';
import LabListComponent from './components/lab-list-component';

export default function DiscoverPage() {
    const pageSize = 10;
    const [trendingLabs, setTrendingLabs] = useState<Array<LabTableType>>([]);
    const [labs, setLabs] = useState<Array<LabTableType>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const route = useRouter();
    useEffect(() => {
        fetchDataFromServer();
    }, []);
    const fetchDataFromServer = async () => {
        setLoading(true);
        setError(null);
        try {
            await getLabs();
            await getServerTrending();
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const getServerTrending = async () => {
        const lab = await getTrendingUserProjectsLab({ page: 1, pageSize: pageSize });
        setTrendingLabs(
            lab.projects.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    isStared: e.hasStarred,
                    commentCount: e.commentCount,
                    description: e.description,
                    starCount: e.starCount,
                    clone: e.clone,
                    viewCount: e.viewCount,
                    user: {
                        email: e.user.email,
                        id: e.user.id,
                        username: e.user.username,
                        userImage: e.user.userImage,
                        role: e.user.role
                    }
                } as LabTableType;
            })
        );
    };
    const getLabs = async () => {
        const lab = await getUserProjectsLab({
            pageSize: pageSize,
            page: 1
        });
        setLabs(
            lab.projects.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    isStared: e.hasStarred,
                    commentCount: e.commentCount,
                    description: e.description,
                    starCount: e.starCount,
                    clone: e.clone,
                    viewCount: e.viewCount,
                    user: {
                        email: e.user.email,
                        id: e.user.id,
                        username: e.user.username,
                        userImage: e.user.userImage,
                        role: e.user.role
                    }
                } as LabTableType;
            })
        );
    };

    const onLabClicked = (lab: LabTableType) => {
        const params = {
            id: lab.id
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/lab-details' + '?' + queryString);
    };

    const onMoreClicked = (trending: boolean) => {
        route.push(`/discover/${trending ? 'trending' : 'recently'}`);
    };

    return (
        <div className="px-3 py-5">
            <div className="flex gap-5 max-md:flex-col">
                <HomeButtons
                    onButtonClick={() => {
                        if (document) {
                            (
                                document.getElementById('new-lab-modal') as HTMLFormElement
                            )?.showModal();
                        }
                    }}
                    color="primary"
                    title="Create new lab"
                    icon="solar:test-tube-minimalistic-bold-duotone"
                    subTitle="Start from scratch. Put some love ❤️ and build something great ✨ ."
                ></HomeButtons>
                <HomeButtons
                    onButtonClick={() => {}}
                    color="secondary"
                    title="Clone a lab"
                    icon="solar:lightbulb-bold-duotone"
                    subTitle="Add your touch 👌 . Create a new masterpiece from another one 🔥."
                ></HomeButtons>
            </div>
            <div className="h-3"></div>
            <ManageState
                loading={loading}
                error={error}
                errorAndEmptyCallback={() => {
                    fetchDataFromServer();
                }}
                loadedState={
                    <>
                        <LabListComponent
                            onMoreClicked={() => {
                                onMoreClicked(false);
                            }}
                            labs={labs}
                            title="Recently worked on"
                            onLabClicked={e => {
                                onLabClicked(e);
                            }}
                            onLabInteractionClicked={() => {}}
                        />
                        <div className="h-3" />
                        <LabListComponent
                            labs={trendingLabs}
                            onMoreClicked={() => {
                                onMoreClicked(true);
                            }}
                            onLabInteractionClicked={() => {}}
                            title="Trending"
                            onLabClicked={e => {
                                onLabClicked(e);
                            }}
                        />
                    </>
                }
                empty={labs.length == 0}
            />
        </div>
    );
}
