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
const VaccineIcon = (props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props}>
            <use xlinkHref='#icon-Vaccine'></use>
        </svg>
    );
}


const ConsultationIcon = (props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props}>
            <use xlinkHref='#icon-PetAdvice'></use>
        </svg>
    );
}

const SurgeryIcon = (props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props}>
            <use xlinkHref='#icon-FirstAid'></use>
        </svg>
    );
}
const DentalIcon = (props)=> {

    return (
        <svg className="icon"  aria-hidden="true"  {...props}>
            <use xlinkHref='#icon-DentalCleaning'></use>
        </svg>
    );
}
const MoreInfoIcon=(props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props} >
            <use xlinkHref='#icon-gengduo'></use>
        </svg>
    );
}

const PostIcon=(props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props} >
            <use xlinkHref='#icon-pengyouquan'></use>
        </svg>
    );
}
const PetIcon=(props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props} >
            <use xlinkHref='#icon-chongwu'></use>
        </svg>
    );
}

const FollowIcon=(props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props} >
            <use xlinkHref='#icon-follow'></use>
        </svg>
    );
}

const FollowerIcon=(props)=> {
    return (
        <svg className="icon"  aria-hidden="true"  {...props} >
            <use xlinkHref='#icon-follower'></use>
        </svg>
    );
}

const MySVG = (props)=>{
    return(
        <svg className='icon' aria-hidden="true" {...props}  >
            <use xlinkHref={props.name}></use>
        </svg>
    )
}
const NewFriend=()=> {

    return (
        <svg className="icon" height={60} width={60} aria-hidden="true">
            <use xlinkHref="#icon-jiahaoyou"></use>
        </svg>
    );
}

export {StatisticsIcon,ServerIcon,TemperatureIcon,CPUIcon,
    RAMIcon,DogIcon,CatIcon,BackForwardIcon,VaccineIcon,
    ConsultationIcon,SurgeryIcon,DentalIcon,NewFriend,MoreInfoIcon
,PetIcon,PostIcon,FollowerIcon,FollowIcon} ;