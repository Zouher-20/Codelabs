import IconRenderer from "@/app/components/globals/icon";
import CircleChart from "@/app/components/statistics/circle";
import { chartType } from "@/app/@types/chart";

const StatisticsComponent = ({ cardLabel, labels, colors, series, height, width }: chartType) => {
    return (
        <div className="py-4 px-10 bg-base-300 rounded-2xl">
            <div className="flex justify-between px-4">
                <span>{cardLabel}</span>
                <IconRenderer className=" cursor-pointer" height={32} width={32} icon='solar:add-circle-broken' />
            </div>
            <CircleChart
                labels={labels}
                series={series}
                colors={colors}
                width={width}
                height={height}
            />
        </div>
    );
}

export default StatisticsComponent;