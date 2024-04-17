import CircleChart from '@/app/components/statistics/circle';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MouseEventHandler } from 'react';
import CodeLabContainer from '../../components/container';

export default function StatisticsContainer({
    color,
    primaryText,
    anotherText,
    onClick,
    withAdd = true
}: {
    color: string;
    primaryText: string;
    anotherText: string;
    onClick?: MouseEventHandler<SVGSVGElement>;
    withAdd?: boolean;
}) {
    return (
        <CodeLabContainer>
            <div className="flex w-full flex-col items-center justify-center p-5">
                <div className="flex w-full justify-between px-5">
                    <h1>{primaryText}</h1>

                    {withAdd ? (
                        <Icon
                            icon="solar:add-circle-broken"
                            className="size-6 hover:cursor-pointer"
                            onClick={onClick}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="h-8"></div>
                <CircleChart
                    labels={[anotherText, primaryText]}
                    series={[30, 80]}
                    colors={['#282C2B', color]}
                    width={200}
                    height={200}
                />
            </div>
        </CodeLabContainer>
    );
}
