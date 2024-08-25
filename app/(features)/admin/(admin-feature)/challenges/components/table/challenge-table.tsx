import IconRenderer from '@/app/components/globals/icon';
import { DIFFICULTTYPE } from '@prisma/client';
import CodeLabTable, { GenericTableModel } from './generic-tabel';
import Link from 'next/link';

export default function ClassesTable({
    currentPage,
    onPageChange,
    pageCount,
    challenges,
    isDelete
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    challenges: Array<challengeTableType>;
    isDelete: (value: boolean) => void;
}) {
    const daysBetween = (date: Date) => {
        let now = new Date();
        const diffInMilliseconds = date.getTime() - now.getTime();
        const days = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const minuts = diffInMilliseconds / (1000 * 60 * 60 * 24);
        if (minuts <= 0) return true;
        else if (minuts < 1) return false
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //         const res = await deleteChallenge({ challengeId: [`${id}`] });
    //         isDelete(true);
    //         toast.success('challenge deleted successfully');
    //         return res;
    //     } catch (error: any) {
    //         toast.error(error.message);
    //     }
    // };
    function TableItem({ item, index }: { item: challengeTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`}>
                <th className="flex h-full gap-4">
                    <IconRenderer
                        className="text-primary"
                        icon={'solar:medal-star-line-duotone'}
                        width={52}
                        height={52}
                    />
                    <div className="flex flex-col self-center">
                        <span>{item.name}</span>
                        <span>{item.createdAt.toLocaleDateString()}</span>
                    </div>
                </th>
                <td>{item.startedAt?.toLocaleDateString()} </td>
                <td>{item.endAt?.toLocaleDateString()} </td>
                {item.endAt && <td className={daysBetween(item.endAt) ? 'text-error' : 'text-primary'}>{daysBetween(item.endAt) ? 'complete' : 'working'}</td>}
                <td>{item.difficulty}</td>
                <td>
                    <Link
                        href={`/admin/challenges/challenge-details/${item.id}`}
                        className="btn btn-outline h-[35px] min-h-[35px]"
                    >
                        Details
                    </Link>
                </td>
                {/* <td>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-outline btn-error h-[35px] min-h-[35px]"
                    >
                        <IconRenderer className="h-6 w-6" icon="solar:trash-bin-2-broken" />
                    </button>
                </td> */}
            </tr>
        );
    }
    return new CodeLabTable<challengeTableType>({
        currentPage: currentPage,
        items: challenges,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: challengeTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr className='text-base'>
                    <th>Challenges</th>
                    <th>Start At</th>
                    <th>End At</th>
                    <th>State</th>
                    <th>Difficulty</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        )
    }).build();
}

export interface challengeTableType extends GenericTableModel {
    id: string;
    name: string;
    isComplete: boolean;
    difficulty: DIFFICULTTYPE;
    endAt: Date | null;
    startedAt: Date | null;
    createdAt: Date;
    description: string | null;
    resources: string | null;
}
