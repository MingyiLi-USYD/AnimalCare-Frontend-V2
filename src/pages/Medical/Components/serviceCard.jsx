import React from 'react';
import {VaccineIcon} from "@/assets/Icons/icon";


function ServiceCard({icon,name}) {
    const style= {
        height:'80px',
        width:'80x',
    }
    return (
        <div className={"service-card"}>
            {
                icon
            }
            <div className={"service-title"}>
                {
                    name
                }
            </div>
            <div className={"service-description"}>
                    Consultations provide anopportunity to discuss healthissues,
                    behavioural problemsor preventative strategies
                    relative to your pet relative to your pet.
            </div>
        </div>
    );
}

export default ServiceCard;