'use client'

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";

const BubbleChart = () => {

    const chartOptions: ApexOptions = {
        series: [
            { name: 'apple', data: [[8, 3, 45]] },
            { name: 'mongo', data: [[4, 6, 60]] },
            { name: 'orange', data: [[10, 9, 90]] }
        ],
        colors: ['#308447', '#1EB854', '#50FA7B'],
        markers: {
            strokeColors: 'rgb(38, 38, 38)'
        },
        chart: {
            type: 'bubble',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            style: {
                fontSize: '20px',
                fontFamily: 'Inter, ui-sans-serif',
                fontWeight: '300',
                colors: ['#282C2B']
            },
            formatter: (value) => value ? `${value}%` : ''
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: true
        },
        stroke: {
            width: 5,
        },
        plotOptions: {
            bubble: {
                zScaling: false,
                minBubbleRadius: 40
            }
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        },
        xaxis: {
            min: 0,
            max: 15,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            max: 15,
            labels: {
                show: false
            }
        },
        tooltip: {
            enabled: false
        },
    };
    return (
        <div className='w-1/3 h-1/3'>
            <ApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="bubble"
                height={300}
                width={300}
            />
        </div>
    );
}

export default BubbleChart;