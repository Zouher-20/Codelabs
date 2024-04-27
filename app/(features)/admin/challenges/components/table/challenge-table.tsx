import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from './generic-tabel';
import IconRenderer from '@/app/components/globals/icon';
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
                        <span >{item.createdAt}</span>
                    </div>
                </th>
                <td>{item.duration} </td>
                <td >
                    {item.tags.map((tag, index) => (
                        <span key={index}>
                            {tag.name}<br />
                        </span>
                    ))
                    }
                </td>
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
                    <th>Duration</th>
                    <th>Tags</th>
                    <th>State</th>
                    <th>Difficulty</th>
                    <th></th>
                </tr>
            </thead>
        )
    }).build();
}

export interface challengeTableType extends GenericTableModel {
    id: number;
    name: string;
    duration: string;
    difficulty: string;
    isComplete: boolean;
    createdAt: string;
    description?: string;
    resources?: string;
    tags: Array<{ name: string; tagType: string }>;
}
