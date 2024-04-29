'use client';
import { findUsers } from '@/app/api/(modules)/admin/service/action';
import { useEffect, useState } from 'react';
import UserViewHeader from './headea';
import UsersTable, { UserTableType } from './user-table';

export function UserViewUserTable({ pageSize }: { pageSize: number }) {
    const [users, setUsers] = useState<Array<UserTableType>>([]);
    const [currentPage, updateCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        getUser({ newSearchWord: searchWord });
    }, []);
    const getUser = async ({ newSearchWord }: { newSearchWord: string }) => {
        setLoading(true);

        try {
            const user = await findUsers({
                page: currentPage,
                pageSize: pageSize,
                searchWord: newSearchWord
            });
            setTotalPageCount(user.userCount);
            setUsers(
                user.user.users.map(e => {
                    return {
                        email: e.email,
                        id: e.id,
                        name: e.username,
                        labs: 1,
                        role: e.role,
                        createdAt: e.createdAt,
                        classes: 1,
                        plan: 'free'
                    } as UserTableType;
                })
            );
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };
    const onPageChange = ({ index }: { index: number }) => {
        updateCurrentPage(index);
        getUser({ newSearchWord: searchWord });
    };

    return (
        <div className="flex flex-col">
            <UserViewHeader
                searchWord={searchWord}
                onFieldChanged={e => {
                    setSearchWord(e);
                    updateCurrentPage(1);
                    setTotalPageCount(0);
                    getUser({ newSearchWord: e });
                }}
                onFieldSubmited={() => {}}
            />
            {loading ? (
                <div className="flex justify-center">Loading</div>
            ) : (
                <UsersTable
                    users={users}
                    pageCount={totalPageCount}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}
