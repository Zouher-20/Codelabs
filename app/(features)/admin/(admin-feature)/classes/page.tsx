'use client';
import { getAllClassRooms } from '@/app/api/(modules)/class-room/services/action';
import Input from '@/app/components/globals/form/input';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ClassesTable, { ClassTableType } from '../components/table/classes-table';

const Classes = () => {
    const pageSize = 10;
    const params = useSearchParams();
    const [classes, setClasses] = useState<Array<ClassTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        var pageNumber = Number(params.get('id') ?? '1');
        updateCurrentPage(pageNumber);
        getClasses({ newSearchWord: searchWord, page: pageNumber });
    }, []);

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
                        teacherName: '',
                        createdAt: new Date().toISOString()
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

    return (
        <div className="flex flex-col gap-2 p-6">
            <Header />
            <ClassesTable
                onDetailsButtonClicked={
                    ({ currentClass }: { currentClass: ClassTableType }) => {}
                    // handleClassClick(currentClass)
                }
                classes={classes}
                pageCount={Math.ceil(totalPageCount / pageSize)}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

const Header = () => {
    return (
        <div className="flex flex-col gap-8 p-6">
            <h1 className="text-4xl font-bold text-white">Classes</h1>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search for Classes ..."
                        icon="circum:search"
                        value={''}
                    />
                </span>
            </div>
            <CustomToaster />
        </div>
    );
};
export default Classes;
