import React from 'react';
import {Space} from 'antd';
import {history, useDispatch} from "umi";
import './cards.less'
import {CatIcon} from "@/assets/Icons/icon";
import {urlWrapper} from "@/utils/imageUtils";



const PetCard = ({item}) => {
    const dispatch = useDispatch()
    const size = {
        height: '40px',
        width: '40px',
    }
    return (
        <div className="pet-card">
            <div className="pet-pic">
                <img
                    src={urlWrapper(item.petAvatar)}
                    onClick={()=>history.push(`/pet/${item.petId}`)}
                />
            </div>

            <div className='item-pet-info'>
                <Space size={8}>
                    <CatIcon {...size}/>
                    <span>{item.category}</span>
                </Space>
                <Space size={8}>
                    <span>{item.petName}</span>
                </Space>
            </div>

        </div>
    );
};

export default PetCard;
