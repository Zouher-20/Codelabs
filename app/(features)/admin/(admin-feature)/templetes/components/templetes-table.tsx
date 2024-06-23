import { TempletsTableType } from '@/app/@types/templetes';
import Button from '@/app/components/globals/form/button';
import CodeLabTable from '../../components/table/generic-tabel';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function TempletessTable({
    currentPage,
    onPageChange,
    pageCount,
    templetes,
    deleteTempletesButtonClicked,
    editTempletesButtonClicked

}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    templetes: Array<TempletsTableType>;
    deleteTempletesButtonClicked: (template: TempletsTableType) => void;
    editTempletesButtonClicked: (template: TempletsTableType) => void;

}) {
    function TableItem({ item, index }: { item: TempletsTableType; index: number }) {

        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>
                    <img className="object-contain  h-20 w-32 rounded-md" src={`http://localhost:3000${item.image?.replace(/\\/g, '/')}`} />
                </td>
                <td>{item.name}</td>
                <td>{item.createdAt?.toLocaleString('en-US')}</td>
                <td className='flex justify-center'>
                    <Icon icon="solar:trash-bin-trash-bold-duotone" fontSize={30} className='text-red-500 hover:cursor-pointer'    onClick={() => deleteTempletesButtonClicked(item)}/>
                    <div className='w-3'></div>
                    <Icon icon="solar:code-square-bold-duotone" fontSize={30} className='text-primary hover:cursor-pointer'    onClick={() => editTempletesButtonClicked(item)}/>
                </td>
            </tr>
        );
    }

    return new CodeLabTable<TempletsTableType>({
        currentPage: currentPage,
        items: templetes,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: TempletsTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Created At</th>
                </tr>
            </thead>
        )
    }).build();
}
