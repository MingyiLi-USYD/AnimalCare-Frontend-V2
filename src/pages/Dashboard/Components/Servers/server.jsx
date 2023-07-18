import React from 'react';
import GaugeChart from "@/pages/Dashboard/Components/GaugeChart";
import EnhancedIcon from "@/components/Icon/enhancedIcon";
import {CPUIcon, RAMIcon, ServerIcon, TemperatureIcon} from "@/assets/Icons/icon";
import EnhancedSwitch from "@/components/Switch/enhancedSwitch";

function Server(props) {
    const iconSize = {
        width:'45px',
        height:'45px',
    }
    const cpu = {
        name:'CPU Frequency',
        value:'5.5GHZ'
    }
    const temperature = {
        name:'Temperature',
        value:'55°C'
    }
    const ram = {
        name:'RAM Size',
        value:'32GB'
    }
    return (
        <div className={'server'}>
            <div className={'left'}>
                <div className={'label'}>
                    Basic Information
                </div>
                <EnhancedIcon {...cpu}>
                    <CPUIcon {...iconSize}/>
                </EnhancedIcon>
                <EnhancedIcon {...temperature}>
                    <TemperatureIcon {...iconSize}/>
                </EnhancedIcon>
                <EnhancedIcon {...ram}>
                    <RAMIcon {...iconSize}/>
                </EnhancedIcon>
                <EnhancedIcon {...ram}>
                    <RAMIcon {...iconSize}/>
                </EnhancedIcon>
            </div>
            <div className={'right'}>
                <div className={'label'}>
                    Detail Information
                </div>
                <div className={'monitors'}>
                    <GaugeChart/>
                    <GaugeChart/>
                    <GaugeChart/>
                </div>
                <div className={'switches'}>
                  <EnhancedSwitch name={'Temperature warm'}>
                      <TemperatureIcon {...iconSize}/>
                  </EnhancedSwitch>
                </div>

            </div>
        </div>
    );
}

export default Server;

