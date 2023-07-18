import React from 'react';
import {Statistics} from "@/assets/Icons/icon";

function EnhancedButton({click}) {
    return (
        <div className={"enhanced-button"} onClick={click}>
            <div className={"button-logo"}>
                <Statistics />
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