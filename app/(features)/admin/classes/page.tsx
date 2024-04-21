'use client';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClassesTable, { ClassTableType } from '../components/table/classes-table';

const Classes = () => {
    const [currentPage, updateCurrentPage] = useState(0);
    const currentParams = useSearchParams();
    var classes: Array<ClassTableType> = [
        {
            id: 1,
            className: 'ClassName',
            teacherName: 'Teacher name',
            labCount: 2,
            memberCount: 10,
            createdAt: 'April 22/4/204'
        },
        {
            id: 2,
            className: 'ClassName',
            teacherName: 'Teacher name',
            labCount: 2,
            memberCount: 10,
            createdAt: 'April 22/4/204'
        },
        {
            id: 3,
            className: 'ClassName',
            teacherName: 'Teacher name',
            labCount: 2,
            memberCount: 10,
            createdAt: 'April 22/4/204'
        },
        {
            id: 4,
            className: 'ClassName',
            teacherName: 'Teacher name',
            labCount: 2,
            memberCount: 10,
            createdAt: 'April 22/4/204'
        },
        {
            id: 5,
            className: 'ClassName',
            teacherName: 'Teacher name',
            labCount: 2,
            memberCount: 10,
            createdAt: 'April 22/4/204'
        }
    ];
    const [selectedClasses, setSelectedClasses] = useState<Array<ClassTableType>>([]);
    const pageSize = 4;

    useEffect(() => {
        const id = Number(currentParams.get('id') ?? '1');
        onPageChange({ index: id });
    }, []);
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        setSelectedClasses([
            ...chunkArray({
                startingIndex: (index - 1) * pageSize,
                lastIndex: index * pageSize,
                array: classes
            })
        ]);
    };
    function chunkArray({
        array,
        lastIndex,
        startingIndex
    }: {
        startingIndex: number;
        array: Array<ClassTableType>;
        lastIndex: number;
    }): Array<ClassTableType> {
        const chunks: Array<ClassTableType> = [];
        for (let i = startingIndex; i < lastIndex && i < array.length; i++) {
            chunks.push(array[i]);
        }
        return chunks;
    }
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
                <div className="dropdown">
                    <summary tabIndex={0} className=" btn flex h-[35px] min-h-[35px]">
                        Date
                        <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                    </summary>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] ml-4 mt-2 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <ClassesTable
                classes={selectedClasses}
                pageCount={Math.ceil(classes.length / pageSize)}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Classes;
