import React from 'react';
import {Gauge} from "@ant-design/charts";

function GaugeChart({name,percent}) {
    const ticks = [0, 1 / 3, 2 / 3, 1]
    const color = ['#30BF78', '#FAAD14','#F4664A', ]
    const config = {
        height:130,
        width:130,
        percent: 0.3,
        range: {
            ticks,
            color,
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            title: {
                formatter: ({ percent }) => percent*100+'%',
                style: ({ percent }) => {
                    return {
                        fontSize: '36px',
                        lineHeight: 1,
                        color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
                    };
                },
            },
            content: {
                offsetY: 50,
                style: {
                    fontSize: '30px',
                    color: '#4B535E',
                },
                formatter: () => 'CPU Usage',
            },
        },
    };
    return (
        <div className={'gauge-loader'}>
            <div className={'title'}>
                CPU Usage
            </div>
            <div>
                <Gauge {...config} />
            </div>
        </div>
    )

}

export default GaugeChart;