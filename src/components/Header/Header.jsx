import React, {useEffect, useState} from 'react';
import './Header.less'
import {Button} from "antd";
import {connect} from "../../.umi/exports";


const Header = (props) => {
    const { MessageModel } = props;
    const [visible,setVisible]=useState(false)
    useEffect(()=>{
        console.log("触发函数")
        if(Object.keys(MessageModel).length!==0){
            setVisible(true)
        }
        setTimeout(() => {
            console.log("开启了定时器")
            setVisible(false);
        }, 5000);
    },[MessageModel])
    return (
        <div>
            <div className={"my-card"}style={{}}>
            </div>
           {/* <Button type={"primary"} onClick={()=>{setVisible(true)}}>点我</Button>*/}
        </div>

    );
};

export default connect(
    ({ MessageModel}) => {
        return { MessageModel };
    },
)(Header);