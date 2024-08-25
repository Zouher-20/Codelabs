import { deleteMyBlog } from '@/app/api/(modules)/blog/services/action';
import IconRenderer from '@/app/components/globals/icon';
import Link from 'next/link';
import toast from 'react-hot-toast';
import CodeLabTable, { GenericTableModel } from './generic-tabel';

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
    isDelete: (value: boolean) => void;
}) {
    const handleDelete = async (id: string) => {
        try {
            const res = await deleteMyBlog({ blogId: id });
            isDelete(true);
            return res;
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    function TableItem({ item, index }: { item: blogTableType; index: number }) {
        return (
            <tr className={`text-center my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={index}>
                <th>{index + 1}</th>
                <td className="line-clamp-2 w-fit pb-0">{item.title}</td>
                <td className='text-primary'>{item.starCount}</td>
                <td className='text-warning'>{item.viewCount}</td>
                <td className='text-rose-500'>{item.commentCount}</td>
                <td>{item.createdAt.toLocaleDateString()}</td>
                <td>
                    <Link
                        href={`/admin/blogs/${item.id}`}
                        className="btn btn-outline h-[35px] min-h-[35px]"
                    >
                        Details
                    </Link>
                </td>
                <td>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-outline btn-error h-[35px] min-h-[35px]"
                    >
                        <IconRenderer className="h-6 w-6" icon="solar:trash-bin-2-broken" />
                    </button>
                </td>
            </tr>
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
                <tr className='text-center text-base'>
                    <th></th>
                    <th className='text-start'>Title</th>
                    <th>Star</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>CreatedAt At</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        )
    }).build();
}

export interface blogTableType extends GenericTableModel {
    viewCount: string;
    id: string;
    title: string;
    photo: string;
    contant: string;
    commentCount: number;
    starCount: number;
    createdAt: Date;
    userId: string;
    isStarred?: boolean | null;
    user: {
        id: string;
        username: string;
        userImage: string | null;
        email: string;
    };
}
