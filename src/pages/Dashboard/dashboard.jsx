import React, {useRef} from 'react';
import './dashboard.less'
import EnhancedButton from "@/pages/Dashboard/Components/enhancedButton";
import {Outlet} from "umi";

function Dashboard() {
    const pageBar = useRef(null)
     return(
         <div className={"dashboard-page"}>
             <div className={"dashboard-container"}>
                 <div className={"page-bar"} ref={pageBar}>
                     <div className={"app-page"}>
                         <EnhancedButton click={()=>{console.log(111)}}/>
                     </div>
                     <div className={"system-page"}>
                         <EnhancedButton/>
                     </div>
                     <div className={"control-page"}>
                         <EnhancedButton/>
                     </div>
                     <div className={"control-page"}>
                         <EnhancedButton/>
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
