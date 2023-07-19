import React from 'react';
import PieChart from "@/pages/Dashboard/Components/pieChart";
import LineChart from "@/pages/Dashboard/Components/lineChart";
import ColumnChart from "@/pages/Dashboard/Components/columnChart";

function Statistics({}) {
    return (
        <div className={'statistics'}>
            <div className={'first-row'}>
                <PieChart/>
                <PieChart/>
                <PieChart/>
            </div>
            <div className={'second-row'}>
                <LineChart/>
                <ColumnChart/>
            </div>

        </div>
    );
}

export default Statistics;