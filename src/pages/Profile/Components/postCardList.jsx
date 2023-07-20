import React, {useState} from 'react';
import {Button, Typography} from 'antd';
import {animated, useSpring} from 'react-spring';
import PetCard from "@/components/Cards/petCard";
import PostCard from "@/components/Cards/postCard";

const { Title } = Typography;

const PostCardList = ({ data = [],avatar }) => {
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
        <div className="post-cards">
            <div className="label">
                <Title level={3} style={{ color: '#cccccc' }}>
                    Post Gallery
                </Title>
            </div>
            <div className="card-list">

                <Button type="primary" onClick={handlePrev} disabled={disablePrev}>
                    Previous
                </Button>

                <div className="visible-cards">
                    <animated.div className="cards" style={cardsAnimation}>
                        {data.map((post) => <PostCard item={post} avatar={avatar} key={post.postId}/>
                        )}
                    </animated.div>
                </div>
                <Button type="primary" onClick={handleNext} disabled={disableNext}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PostCardList;
