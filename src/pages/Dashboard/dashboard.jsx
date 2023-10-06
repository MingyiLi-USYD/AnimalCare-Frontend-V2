import React from 'react';
import './dashboard.less'
import EnhancedButton from "@/pages/Dashboard/Components/enhancedButton";
import {Outlet} from "umi";
import {LogIcon, ProgressIcon, ProjectIcon, ServerIcon, StatisticsIcon} from "@/assets/Icons/icon";
const statistics = {
    name:'statistics',
    icon:<StatisticsIcon />,
    title:'Data Analysis',
    other:'6 charts'
}

const server = {
    name:'server',
    icon:<ServerIcon />,
    title:'Server Info',
    other:'10 charts'
}

const log = {
    name:'log',
    icon:<LogIcon />,
    title:'Log Detail',
    other:'100 logs'
}

const project = {
    name:'project',
    icon:<ProjectIcon />,
    title:'Project Info',
    other:'23 tables'
}
const progress = {
    name:'progress',
    icon:<ProgressIcon />,
    title:'Progress Info',
    other:'56 tables'
}
function Dashboard() {

    return (
        <div className={"dashboard-page"}>
            <div className={"dashboard-container"}>
                <div className={"page-bar"}>
                    <div className={'statistics-page'}>
                        <EnhancedButton {...statistics}/>
                    </div>
                    <div className={`system-page`}>
                        <EnhancedButton {...server}/>
                    </div>
                    <div className={`control-page`}>
                        <EnhancedButton {...project}/>
                    </div>
                    <div className={`other-page`}>
                        <EnhancedButton {...log}/>
                    </div>
                    <div className={`other-page`}>
                        <EnhancedButton {...progress}/>
                    </div>
                </div>
                <div className={"child-page"}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
