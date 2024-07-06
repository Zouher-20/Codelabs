import { chartType } from '@/app/@types/chart';
import IconRenderer from '@/app/components/globals/icon';
import CircleChart from '@/app/components/statistics/circle';

const StatisticsComponent = ({
    cardLabel,
    labels,
    colors,
    series,
    height,
    width,
    addStat
}: chartType) => {
    return (
        <div className="flex min-w-72 flex-col gap-2 rounded-2xl bg-base-300 p-6">
            <div className="flex justify-between ">
                <span>{cardLabel}</span>
                {!addStat && (
                    <IconRenderer
                        className=" cursor-pointer"
                        height={32}
                        width={32}
                        icon="solar:add-circle-broken"
                    />
                )}
            </div>
            <div className="self-center p-2">
                <CircleChart
                    labels={labels}
                    series={series}
                    colors={colors}
                    width={width}
                    height={height}
                />
            </div>
        </div>
    );
};

export default StatisticsComponent;
