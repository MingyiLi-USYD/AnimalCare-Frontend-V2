import React from 'react';
import { StatisticsIcon } from "@/assets/Icons/icon";
import {history,useLocation} from 'umi'

function EnhancedButton({ name,icon,title,other }) {
    const location = useLocation();
    const active = location.pathname === `/dashboard/${name}`;
    const handleClick = () => {
        history.push(`/dashboard/${name}`);
    };

    return (
        <div className={`enhanced-button ${active ? 'active' : ''}`} onClick={handleClick}>
            <div className={"button-logo"}>
                {icon}
            </div>
            <div className={"button-label"}>
                {title}
            </div>
            <div className={"chart-count"}>
                {other}
            </div>
        </div>
    );
}

export default EnhancedButton;
