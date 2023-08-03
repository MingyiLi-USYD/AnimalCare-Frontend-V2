import React from 'react';
import './medical.less'
import ServiceCard from "@/pages/Medical/Components/serviceCard";
import {ConsultationIcon, DentalIcon, SurgeryIcon, VaccineIcon} from "@/assets/Icons/icon";
const style= {
    height:'80px',
    width:'80x',
}

function Medical(props) {

    return (
        <div className={"medical-page"}>
            <div>
                宠物服务预约
            </div>
            <div className={"service-list"}>
                <ServiceCard icon={     <VaccineIcon {...style} />} name={"Vaccinate"} />
                <ServiceCard icon={ <ConsultationIcon {...style}/>} name={"ConsultationIcon"}/>
                <ServiceCard icon={<DentalIcon {...style}/>} name={"Dental Checkup"}/>
                <ServiceCard icon={<SurgeryIcon {...style}/>} name={"Surgery"}/>
            </div>
        </div>
    );
}

export default Medical;