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

const BackForwardIcon = (props)=> {
    const { style,onClick} = props;
    return (
        <MySVG name={'#icon-a-zuofanhuihoutui'} style={style} onClick={onClick}/>
    );
}
const MySVG = (props)=>{
    return(
        <svg className='icon' aria-hidden="true" {...props}  >
            <use xlinkHref={props.name}></use>
        </svg>
    )
}


export {StatisticsIcon,ServerIcon,TemperatureIcon,CPUIcon,RAMIcon,DogIcon,CatIcon,BackForwardIcon} ;