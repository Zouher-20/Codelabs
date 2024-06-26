'use client';
import { getAllClassRooms } from '@/app/api/(modules)/class-room/services/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClassesTable, { ClassTableType } from '../components/table/classes-table';
import ClassesViewHeader from './statistics/components/header';

const Classes = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [classes, setClasses] = useState<Array<ClassTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');
    const route = useRouter();

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getClasses({ newSearchWord: searchWord, page: pageNumber });
    }, [searchWord]);

    const getClasses = async ({ newSearchWord, page }: { newSearchWord: string; page: number }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllClassRooms({
                page: page,
                pageSize: pageSize,
                searchWord: newSearchWord
            });
            setTotalPageCount(res.totalCount);
            setClasses(
                res.classRooms.map(e => {
                    return {
                        className: e.name ?? '',
                        id: e.id ?? '',
                        labCount: e.roomCount ?? 0,
                        memberCount: e.memberCount ?? 0,
                        teacherName: e.MemberClass[0].user.username,
                        createdAt: e.createdAt.toUTCString()
                    };
                })
            );
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getClasses({ newSearchWord: searchWord, page: index });
    };
    const handleClassClick = (currentClass: ClassTableType) => {
        const params = {
            id: currentClass.id.toString()
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/admin/classes/statistics' + '?' + queryString);
        return;
    };
    return (
        <div className="flex flex-col gap-2 p-6">
            <ClassesViewHeader
                onFieldChanged={e => {
                    updateCurrentPage(1);
                    setSearchWord(e);
                }}
                searchWord={searchWord}
            />
            <ManageState
                loading={loading}
                error={error}
                errorAndEmptyCallback={() => {}}
                empty={classes.length == 0}
                loadedState={
                    <ClassesTable
                        onDetailsButtonClicked={({
                            currentClass
                        }: {
                            currentClass: ClassTableType;
                        }) => handleClassClick(currentClass)}
                        classes={classes}
                        pageCount={Math.ceil(totalPageCount / pageSize)}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                }
            />
        </div>
    );
};

export default Classes;
