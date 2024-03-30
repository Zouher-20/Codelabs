'use client';

import CircleChart from '@/app/components/statistics/circle';
import { useSearchParams } from 'next/navigation';
import CodeLabContainer from '../components/container';

export default function StatisticsPage() {
    const params = useSearchParams();
    return (
        <div className="flex min-h-[550px] flex-col gap-2">
            <div className="flex gap-2 md:w-1/2">
                <CodeLabContainer>
                    <div className="flex items-center">
                        <CircleChart
                            labels={['Apple', 'Mango']}
                            series={[30, 80]}
                            colors={['#282C2B', '#50FA7B']}
                            width={250}
                            height={250}
                        />
                    </div>
                </CodeLabContainer>
                <CodeLabContainer></CodeLabContainer>
            </div>
            <div className="flex w-full gap-2">
                <div className="w-1/4">
                    <CodeLabContainer></CodeLabContainer>
                </div>
                <CodeLabContainer></CodeLabContainer>
            </div>
            <div className="w-full">
                <CodeLabContainer></CodeLabContainer>
            </div>
        </div>
    );
}
