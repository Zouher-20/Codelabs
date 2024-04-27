'use client';
import { findUsers } from '@/app/api/(modules)/admin/service/action';
import { useEffect, useState } from 'react';
import UsersTable, { UserTableType } from './user-table';

export function UserViewUserTable({
    pageSize,
    users
}: {
    pageSize: number;
    users: Array<UserTableType>;
}) {
    const [selectedClasses, setSelectedClasses] = useState<Array<UserTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(0);
    useEffect(() => {
        try {
            getUser();
        } catch (e) {}
    }, []);
    const getUser = async () => {
        const user = await findUsers({ page: 1, pageSize: 10 });
        console;
        console.log(user.user);
        console.log(user);
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
    return (
        <UsersTable
            users={selectedClasses}
            pageCount={Math.ceil(users.length / pageSize)}
            currentPage={currentPage}
            onPageChange={onPageChange}
        />
    );
}
