import { LabTableType } from '@/app/(features)/admin/(admin-feature)/discover/components/lab-table';
import LabCard from '@/app/components/globals/lab/lab-card';
import CodeLabList from '@/app/components/list/generic-list';

export default function LabListComponent({
    currentPage,
    onPageChange,
    pageCount,
    labs,
    onLabClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    labs: Array<LabTableType>;
    onLabClicked: (lab: LabTableType) => void;
}) {
    function TableItem({ item, index }: { item: LabTableType; index: number }) {
        return (
            <LabCard
                onInteractionClicked={interactionIndex => {}}
                lab={item}
                onLabClicked={onLabClicked}
            />
        );
    }

    return new CodeLabList<LabTableType>({
        currentPage: currentPage,
        items: labs,
        wrap: true,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        itemBuilder: ({ item, index }: { item: LabTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        }
    }).build();
}
