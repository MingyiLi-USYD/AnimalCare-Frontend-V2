import React from 'react';
import PieChart from "@/pages/Dashboard/Components/pieChart";
import LineChart from "@/pages/Dashboard/Components/lineChart";
import ColumnChart from "@/pages/Dashboard/Components/columnChart";

function Statistics({}) {
    return (
        <div className={'statistics'}>
            <div>
                <PieChart/>
                <PieChart></PieChart>
            </div>
            <div>
                <LineChart/>
                <ColumnChart/>
            </div>

        </div>
    );
}

export default Statistics;