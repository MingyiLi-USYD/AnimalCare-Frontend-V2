import React from 'react';
import {BackwardOutlined} from "@ant-design/icons";
import {history} from "umi";

function BackForward(props) {
    return (
        <div><BackwardOutlined style={{fontSize:30,color:"blue"}} onClick={()=>{history.back()}}/></div>
    );
}

export default BackForward;
