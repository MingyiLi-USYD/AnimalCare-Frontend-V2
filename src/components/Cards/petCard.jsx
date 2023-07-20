import React from 'react';
import {Avatar, Space} from 'antd';
import {history} from "umi";
import './cards.less'
import {CatIcon, DogIcon} from "@/assets/Icons/icon";


const PetCard = ({item}) => {
   const size= {
       height:'40px',
       width:'40px',
   }
    return (
        <div className="pet-card">
                <div className="pet-pic">
                    <img
                        src={item.petAvatar}
                        onClick={() => {
                            history.push(`/pet/${item.petId}`);
                        }}
                    />
                </div>

                    <div className='item-pet-info'>
                        <Space  size={8}>
                          <CatIcon {...size}/>
                            <span>{item.category}</span>
                        </Space>
                        <Space  size={8}>
                            <span>{item.petName}</span>
                        </Space>
                    </div>

        </div>
    );
};

export default PetCard;
