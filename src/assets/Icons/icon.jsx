import React from 'react';
import '../fonts/iconfont'
import './icon.less'
const Statistics = ()=>{
   return <svg className="diy-icon" aria-hidden="true">
       <use xlinkHref="#icon-tongji" ></use>
   </svg>
}
const ServerIcon = (props)=>{
    const { width, height } = props;
    return <svg className="diy-icon"  aria-hidden="true"  style={{ width, height }}>
        <use xlinkHref="#icon-jiankong" ></use>
    </svg>
}

const TemperatureIcon = (props)=>{
    const { width, height } = props;
    return <svg className="diy-icon"  aria-hidden="true"  style={{ width, height }}>
        <use xlinkHref="#icon-wendu" ></use>
    </svg>
}
const CPUIcon = (props)=>{
    const { width, height } = props;
    return <svg className="diy-icon"  aria-hidden="true"  style={{ width, height }}>
        <use xlinkHref="#icon-CPU" ></use>
    </svg>
}

const RAMIcon = (props)=>{
    const { width, height } = props;
    return <svg className="diy-icon"  aria-hidden="true"  style={{ width, height }}>
        <use xlinkHref="#icon-neicun-RAM" ></use>
    </svg>
}
export {Statistics,ServerIcon,TemperatureIcon,CPUIcon,RAMIcon} ;