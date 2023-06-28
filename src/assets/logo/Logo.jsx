import React from 'react';
import './Logo.less'
function Logo() {

    return (
        <svg className="icon" style={{fontSize:"1.3em"}} aria-hidden="true">
            <use xlinkHref="#icon-Cat"></use>
        </svg>
    );
}
function DogLogo() {

    return (
        <svg className="icon" style={{fontSize:"1.3em"}} aria-hidden="true">
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


export  {Logo,DogLogo,NewFriend};