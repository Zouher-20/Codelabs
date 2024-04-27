import IconRenderer from "@/app/components/globals/icon";
import CircleChart from "@/app/components/statistics/circle";
import { chartType } from "@/app/@types/chart";

const StatisticsComponent = ({ cardLabel, labels, colors, series, height, width }: chartType) => {
    return (
        <div className="flex flex-col p-6 bg-base-300 rounded-2xl gap-2 min-w-72">
            <div className="flex justify-between ">
                <span>{cardLabel}</span>
                <IconRenderer className=" cursor-pointer" height={32} width={32} icon='solar:add-circle-broken' />
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
}

export default StatisticsComponent;