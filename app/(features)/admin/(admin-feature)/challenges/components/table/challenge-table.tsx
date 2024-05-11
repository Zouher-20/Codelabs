import CodeLabTable, { GenericTableModel } from './generic-tabel';
import IconRenderer from '@/app/components/globals/icon';
import { DIFFICULTTYPE } from '@prisma/client';
import Link from 'next/link';

export default function ClassesTable({
    currentPage,
    onPageChange,
    pageCount,
    challenges
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    challenges: Array<challengeTableType>;
}) {
    function TableItem({ item, index }: { item: challengeTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`}>
                <th className='flex gap-4 h-full'>
                    <IconRenderer className='text-primary' icon={"solar:medal-star-line-duotone"} width={52} height={52} />
                    <div className='flex flex-col self-center'>
                        <span  >{item.name}</span>
                        <span >{item.createdAt.toLocaleDateString()}</span>
                    </div>
                </th>
                <td>{(item.startedAt?.toLocaleDateString())} </td>
                <td>{(item.endAt?.toLocaleDateString())} </td>
                <td>{item.isComplete ? "complete" : "working"}</td>
                <td>{item.difficulty}</td>
                <td>
                    <Link href={`/admin/challenges/challenge-details/${item.id}`} className="btn h-[35px] min-h-[35px] btn-outline">
                        Details
                    </Link>
                </td>
            </tr >
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
                <tr >
                    <th>Challenges</th>
                    <th>Start At</th>
                    <th>End At</th>
                    <th>State</th>
                    <th>Difficulty</th>
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