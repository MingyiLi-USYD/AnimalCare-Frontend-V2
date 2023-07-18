import React from 'react';
import './enhancedIcon.less'
function EnhancedIcon({name,value,children}) {
    return (
        <div className={'enhanced-icon'}>
            <div className={'logo'}>
                {
                    children
                }
            </div>
            <div className={'info'}>
                <div className={'name'}>
                    {name}
                </div>
                <div className={'value'}>
                    {value}
                </div>
            </div>
        </div>
    );
}

export default EnhancedIcon;