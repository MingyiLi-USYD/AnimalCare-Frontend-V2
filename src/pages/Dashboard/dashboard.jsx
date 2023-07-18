import React, {useRef} from 'react';
import './dashboard.less'
import EnhancedButton from "@/pages/Dashboard/Components/enhancedButton";
import {Outlet, history} from "umi";


function Dashboard() {

    const statistics = {}
    return (
        <div className={"dashboard-page"}>
            <div className={"dashboard-container"}>
                <div className={"page-bar"}>
                    <div className={'statistics-page'}>
                        <EnhancedButton name={'statistics'}/>
                    </div>
                    <div className={`system-page`}>
                        <EnhancedButton name={'server'}/>
                    </div>
                    <div className={`control-page`}>
                        <EnhancedButton name={'control'}/>
                    </div>
                    <div className={`other-page`}>
                        <EnhancedButton name={'other'}/>
                    </div>
                    <div className={`other-page`}>
                        <EnhancedButton name={'other'}/>
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

/*             <div className={"pie-one"}>
                 <PieChart/>
             </div>
             <div className={"pie-one"}>
                 <PieChart/>
             </div>
             <div className={"pie-one"}>
                 <PieChart/>
             </div>
             <div className={"pie-one"}>
                 <PieChart/>
             </div>*/

/*
<div className={"page-button"}></div>
*/
