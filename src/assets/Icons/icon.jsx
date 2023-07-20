import React from 'react';
import '../fonts/iconfont'
import './icon.less'
const StatisticsIcon = (props)=>{
    const { width, height } = props;
   return <svg className="diy-icon" aria-hidden="true" style={{width,height}}>
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

const CatIcon = (props)=> {
    const { width, height } = props;
    return (
        <svg className="icon"  aria-hidden="true" style={{ width, height }}>
            <use xlinkHref="#icon-Cat"></use>
        </svg>
    );
}
const DogIcon = (props)=> {
    const { width, height } = props;
    return (
        <svg className="icon"  aria-hidden="true" style={{ width, height }}>
            <use xlinkHref="#icon-Dog"></use>
        </svg>
    );
}
function NewFriend() {

    return (
        <svg className="icon" style={{fontSize:"2em"}} aria-hidden="true">
            <use xlinkHref="#icon-jiahaoyou"></use>
        </svg>
    );
}
export {StatisticsIcon,ServerIcon,TemperatureIcon,CPUIcon,RAMIcon,DogIcon,CatIcon} ;