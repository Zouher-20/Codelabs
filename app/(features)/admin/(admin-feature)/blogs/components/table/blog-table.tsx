import CodeLabTable, { GenericTableModel } from './generic-tabel';
import IconRenderer from '@/app/components/globals/icon';
import Link from 'next/link';
import { deleteChallenge } from '@/app/api/(modules)/admin/challenge/services/action';
import toast from 'react-hot-toast';
import { deleteMyBlog } from '@/app/api/(modules)/blog/services/action';

export default function BlogTable({
    currentPage,
    onPageChange,
    pageCount,
    blogs,
    isDelete
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    blogs: Array<blogTableType>;
    isDelete: (value: boolean) => void
}) {
    const handleDelete = async (id: string) => {
        try {
            const res = await deleteMyBlog({ blogId: id });
            isDelete(true)
            return res;
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    function TableItem({ item, index }: { item: blogTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`}>
                <th>{index + 1}</th>
                <td className='pb-0 line-clamp-2 w-64'>{item.title}</td>
                <td>{(item.starCount)} </td>
                <td >{(item.commentCount)}</td>
                <td>{item.createdAt.toLocaleDateString()}</td>
                <td>
                    <Link href={`/admin/challenges/challenge-details/${item.id}`} className="btn h-[35px] min-h-[35px] btn-outline">
                        Details
                    </Link>
                </td>
                <td>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className='h-[35px] min-h-[35px] btn btn-error btn-outline'>
                        <IconRenderer
                            className='w-6 h-6'
                            icon='solar:trash-bin-2-broken'
                        />
                    </button>
                </td>
            </tr >
        );
    }
    return new CodeLabTable<blogTableType>({
        currentPage: currentPage,
        items: blogs,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: blogTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th></th>
                    <th>title</th>
                    <th>star </th>
                    <th>comments</th>
                    <th>createdAt At</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        )
    }).build();
}

export interface blogTableType extends GenericTableModel {
    id: string;
    title: string;
    photo: string;
    contant: string;
    commentCount: number;
    starCount: number;
    createdAt: Date;
    userId: string;
    user: {
        id: string;
        username: string;
        userImage: string | null;
        email: string;
    };
}