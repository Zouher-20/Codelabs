'use client';
import Input from '@/app/components/globals/form/input';
import IconRenderer from '@/app/components/globals/icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UsersTable, { UserTableType } from './components/user-table';

const Users = () => {
    const [currentPage, updateCurrentPage] = useState(0);
    const currentParams = useSearchParams();

    var users: Array<UserTableType> = [
        {
            id: 1,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 2,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 3,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 4,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        },
        {
            id: 5,
            name: 'Johe Doe',
            email: 'johnDoe@gmail.com',
            plan: 'free',
            labs: 1,
            classes: 1
        }
    ];
    const [selectedClasses, setSelectedClasses] = useState<Array<UserTableType>>([]);
    const pageSize = 4;
    const route = useRouter();
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
                array: users
            })
        ]);
    };
    function chunkArray({
        array,
        lastIndex,
        startingIndex
    }: {
        startingIndex: number;
        array: Array<UserTableType>;
        lastIndex: number;
    }): Array<UserTableType> {
        const chunks: Array<UserTableType> = [];
        for (let i = startingIndex; i < lastIndex && i < array.length; i++) {
            chunks.push(array[i]);
        }
        return chunks;
    }
    return (
        <div className="flex flex-col gap-2 p-6">
            <Header />
            <UsersTable
                users={selectedClasses}
                pageCount={Math.ceil(users.length / pageSize)}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

const Header = () => {
    return (
        <div className="flex flex-col gap-8 p-6">
            <h1 className="text-4xl font-bold text-white">Users</h1>

            <div className="flex gap-8">
                <span>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search for Users ..."
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
        </div>
    );
};
export default Users;
