import React from 'react';

import {history} from "umi";
import {BackForwardIcon} from "@/assets/Icons/icon";

function BackForward(props) {
    const style = { height: '40px', width: '40px', cursor: 'pointer' };
    return (
        <div><BackForwardIcon style={style} onClick={()=>history.back()}/></div>
    );
}

export default BackForward;
