import React from 'react';
import { StatisticsIcon } from "@/assets/Icons/icon";
import {history,useLocation} from 'umi'

function EnhancedButton({ name }) {
    const location = useLocation();
    const active = location.pathname === `/dashboard/${name}`;
    const handleClick = () => {
        history.push(`/dashboard/${name}`);
    };

    return (
        <div className={`enhanced-button ${active ? 'active' : ''}`} onClick={handleClick}>
            <div className={"button-logo"}>
                <StatisticsIcon />
            </div>
            <div className={"button-label"}>
                Data Analysis
            </div>
            <div className={"chart-count"}>
                6 charts
            </div>
        </div>
    );
}

export default EnhancedButton;
