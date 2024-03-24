'use client'

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { chartType } from "@/app/@types/chart";


const CircleChart = ({ labels, colors, series, height, width }: chartType) => {

    const chartOptions: ApexOptions = {
        series: series,
        labels: labels,
        colors: colors,
        chart: {
            type: 'donut',
            id: 'apexchart-example'
        },
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
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ['#50FA7B', '#282C2B'],
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
        }
    };
    return (
        <div className='w-1/3 h-1/3'>
            <ApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="donut"
                height={height}
                width={width}
            />
        </div>
    );
}

export default CircleChart;