import { useRouter } from 'next/navigation';

export default function PagginationComponent({
    currentPage,
    onPageChange,
    pageCount
}: {
    currentPage: number;
    onPageChange: ({ page }: { page: number }) => void;
    pageCount: number;
}) {
    console.log(currentPage);
    var startingIndex = Math.max(currentPage - 2, 1);
    const lastItem = Math.min(currentPage + 2, pageCount);
    while (startingIndex > 0 && lastItem - startingIndex < 5) {
        startingIndex--;
    }
    const router = useRouter();
    function Item({ index }: { index: number }) {
        const handleChallengesClick = () => {
            onPageChange({ page: index });
            const params = {
                id: index.toString()
            };
            const queryString = new URLSearchParams(params).toString();
            router.push('/admin/challenges' + '?' + queryString);
            return;
        };
        return (
            <li>
                <div
                    className={`${currentPage == index ? 'bg-primary text-black' : 'bg-transparent text-neutral-600'} relative block cursor-pointer rounded px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100`}
                    onClick={() => {
                        handleChallengesClick();
                    }}
                >
                    {index}
                </div>
            </li>
        );
    }
    function PreviosNextItem({ toIndex }: { toIndex: number }) {
        const handleChallengesClick = () => {
            if (toIndex > 0 && toIndex <= pageCount) {
                onPageChange({ page: toIndex });
                const params = {
                    id: toIndex.toString()
                };
                const queryString = new URLSearchParams(params).toString();
                router.push('/admin/challenges' + '?' + queryString);
                return;
            }
        };
        const isNext = toIndex > currentPage;
        const clickable = (isNext && currentPage != pageCount) || (!isNext && currentPage != 1);

        return (
            <li>
                <div
                    className={`${clickable ? 'cursor-pointer text-white hover:bg-primary  hover:text-black' : 'text-neutral-600'} relative block rounded px-3 py-1.5 text-sm transition-all duration-300`}
                    onClick={() => {
                        handleChallengesClick();
                    }}
                >
                    {isNext ? 'Next' : 'Previous'}
                </div>
            </li>
        );
    }
    return (
        <ul className="list-style-none flex">
            <PreviosNextItem toIndex={currentPage - 1} />
            {Array.from({ length: 5 }).map((_item, index) => {
                return startingIndex + index >= pageCount ? (
                    <div key={index}></div>
                ) : (
                    <Item key={index} index={startingIndex + index + 1} />
                );
            })}
            <PreviosNextItem toIndex={currentPage + 1} />
        </ul>
    );
}
