'use client';

import { chartType } from '@/app/@types/chart';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CircleChart = ({ labels, colors, series, height, width }: chartType) => {
    const chartOptions: ApexOptions = {
        series: series,
        labels: labels,
        colors: colors,
        chart: {
            type: 'donut',
            id: 'apexchart-example'
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'left',
            labels: {
                colors: 'white'
            }
        },
        responsive: [
            {
                breakpoint: 0,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        horizontalAlign: 'left',
                        position: 'bottom'
                    }
                }
            }
        ],
        stroke: {
            show: false
        },
        tooltip: {
            enabled: false
        },
        dataLabels: {
            enabled: true,
            formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                return w.config.series[seriesIndex];
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: [colors[1], colors[0]]
            },
            background: {
                enabled: true
            }
        }
    };
    return (
        <ApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="donut"
            height={height}
            width={width}
        />
    );
};

export default CircleChart;
