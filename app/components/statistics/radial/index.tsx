'use client'

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { chartType } from "@/app/@types/chart";

const RadialChart = ({ labels, colors, series, height, width }: chartType) => {

    const chartOptions: ApexOptions = {
        series: series,
        labels: labels,
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#282C2B",
                },
            },
        },
        colors: colors,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        dataLabels: {
            enabled: false,
        }, stroke: {
            show: false,
        },
    }
    return (
        <div className='w-1/3 h-1/3' >
            <ApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="radialBar"
                height={height}
                width={width}
            />
        </div >
    );
}

export default RadialChart;