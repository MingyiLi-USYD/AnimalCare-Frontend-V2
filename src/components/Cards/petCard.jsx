import React from 'react';
import {Avatar} from 'antd';
import {history} from "umi";
import './cards.less'


const PetCard = ({item}) => {

    return (
        <div className="pet-card">
                <div className="pic">
                    <img
                        src={item.petAvatar}
                        onClick={() => {
                            history.push(`/pet/${item.petId}`);
                        }}
                    />
                </div>
                <div className="item-description">{item.petDescription}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="item-userinfo">
                        <Avatar
                            size={28}
                            src={item.petAvatar}
                            onClick={() => {
                                history.push(`/pet/${item.petId}`);
                            }}
                        />
                        <span className="nickname">{item.petName}</span>
                    </div>
                </div>
        </div>
    );
};

export default PetCard;
