import React from 'react';
import {Progress} from "antd";

function UploadingProgress({percent}) {
    return (
        <div style={{
            width: '100%',
            height: '70vh',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <Progress
                type="circle"
                percent={percent}
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
            />
            <span>Uploading</span>
        </div>
    );
}

export default UploadingProgress;