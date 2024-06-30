'use client';

import LabListComponent from '@/app/(features)/(main)/stared/components/lab_list';
import { LabTableType } from '@/app/(features)/admin/(admin-feature)/discover/components/lab-table';
import { getStarredUserProjects } from '@/app/api/(modules)/user-project/services/action';
import Input from '@/app/components/globals/form/input';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function StaredPage() {
    const pageSize = 10;
    const [totalItemCount, setTotalItemCount] = useState<number>(0);
    const [searchWord, setSearchWord] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [labs, setLabs] = useState<Array<LabTableType>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const route = useRouter();
    useEffect(() => {
        fetchDataFromServer();
    }, [page, searchWord]);
    const fetchDataFromServer = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getStarredUserProjects({
                searchWord: searchWord,
                page: page,
                pageSize: pageSize
            });
            setLabs(
                res.starredUserProjects.map<LabTableType>((e: any) => {
                    return {
                        ...e,
                        user: {
                            email: e.user.email,
                            id: e.user.id,
                            username: e.user.username,
                            userImage: e.user.userImage,
                            role: e.user.role
                        },
                        commentCount: e.commentCount,
                        starCount: e.starCount,
                        isStared: true,
                        viewCount: e.viewCount
                    };
                })
            );
            setTotalItemCount(res.starredUserProjectCount);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const onLabClicked = (lab: LabTableType) => {
        const params = {
            id: lab.id
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/lab-details' + '?' + queryString);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-8 px-6 py-2">
                <h1 className="text-4xl font-bold text-white">Stared Labs</h1>

                <div className="flex gap-8">
                    <span>
                        <Input
                            id="lab"
                            type="text"
                            placeholder="Search for Lab ..."
                            icon="circum:search"
                            value={searchWord}
                            onChange={e => {
                                setSearchWord(e.target.value);
                                setPage(1);
                            }}
                        />
                    </span>
                </div>
            </div>{' '}
            <div className="pb-3">
                <ManageState
                    loading={loading}
                    error={error}
                    errorAndEmptyCallback={() => {
                        fetchDataFromServer();
                    }}
                    loadedState={
                        <>
                            <LabListComponent
                                onLabClicked={onLabClicked}
                                labs={labs}
                                currentPage={page}
                                pageCount={totalItemCount / pageSize}
                                onPageChange={({ index }: { index: number }) => {
                                    setPage(index);
                                }}
                            />
                        </>
                    }
                    empty={labs.length == 0}
                />
            </div>
        </div>
    );
}
