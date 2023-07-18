import React, { useState} from 'react';
import './enhancedSwitch.less'
import {Switch} from "antd";

function EnhancedSwitch({name,children}) {
    const [switchOn, setSwitchOn] = useState(false);

    const handleSwitchChange = (checked) => {
        setSwitchOn(checked);
    };
    return (
        <div className={'enhanced-switch'}>
            <div className={'switch-status'}>
                <div>{switchOn ? 'On' : 'Off'}</div>
                <div>
                    <Switch onChange={handleSwitchChange} />
                </div>
            </div>
            <div className={'logo'}>
                {children}
            </div>
            <div className={'name'}>
                {name}
            </div>
        </div>
    );
}

export default EnhancedSwitch;