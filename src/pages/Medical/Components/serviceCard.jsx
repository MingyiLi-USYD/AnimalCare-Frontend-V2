import React from 'react';
import {VaccineIcon} from "@/assets/Icons/icon";


function ServiceCard({icon,name}) {
    return (
        <div className={"service-card"}>
            <div className={"service-icon"}>
                {
                    icon
                }
            </div>

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