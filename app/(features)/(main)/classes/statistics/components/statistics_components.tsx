import CircleChart from '@/app/components/statistics/circle';
import { Icon } from '@iconify/react/dist/iconify.js';
import CodeLabContainer from '../../components/container';

export default function StatisticsContainer({
    color,
    primaryText,
    anotherText
}: {
    color: string;
    primaryText: string;
    anotherText: string;
}) {
    return (
        <CodeLabContainer>
            <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full justify-between px-5">
                    <h1>{primaryText}</h1>
                    <Icon icon="solar:add-circle-broken" className="size-6 hover:cursor-pointer" />
                </div>
                <div className="h-8"></div>
                <CircleChart
                    labels={[anotherText, primaryText]}
                    series={[30, 80]}
                    colors={['#282C2B', color]}
                    width={260}
                    height={260}
                />
            </div>
        </CodeLabContainer>
    );
}
