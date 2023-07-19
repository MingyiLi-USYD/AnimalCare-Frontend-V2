import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { useSprings, animated, useSpring } from 'react-spring';
import PetCard from '@/pages/Profile/Components/petCard';

const { Title } = Typography;

const PetCardList = ({ data = [] }) => {
    data=[...data,...data,...data,...data]
    const [offset, setOffset] = useState(0);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(data.length <= 3);

    const handlePrev = () => {
        if (offset === 0) return;
        setOffset((prevOffset) => prevOffset + 300);
        setDisableNext(false);
        if (offset + 300 === 0) {
            setDisablePrev(true);
        }
    };

    const handleNext = () => {
        if (offset === -(data.length - 3) * 300) return;
        setOffset((prevOffset) => prevOffset - 300);
        setDisablePrev(false);
        if (offset - 300 === -(data.length - 3) * 300) {
            setDisableNext(true);
        }
    };

    const cardsAnimation = useSpring({
        transform: `translateX(${offset}px)`,
        config: { tension: 220, friction: 20 },
    });

    return (
        <div className="pet-cards">
            <div className="label">
                <Title level={3} style={{ color: '#cccccc' }}>
                    Pet Gallery
                </Title>
            </div>
            <div className="card-list">
                <div className="pre">
                    <Button type="primary" onClick={handlePrev} disabled={disablePrev}>
                        Previous
                    </Button>
                </div>
                <div className="visible-cards">
                    <animated.div className="cards" style={cardsAnimation}>
                        {data.map((card,index) => (
                            <PetCard id={index} key={card.id} />
                        ))}
                    </animated.div>
                </div>
                <div className="next">
                    <Button type="primary" onClick={handleNext} disabled={disableNext}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PetCardList;
