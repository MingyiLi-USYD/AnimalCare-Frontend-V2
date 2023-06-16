import React, {useState} from 'react';
import {Button, Col, Row, Typography} from 'antd';
import PostCard from "./PostCard";


const { Title } = Typography;
const PostCardList = ({data=[]}) => {
    const [startIdx, setStartIdx] = useState(0);

    const handlePrev = () => {
        setStartIdx((prevIdx) => Math.max(prevIdx - 3, 0));
    };

    const handleNext = () => {
        setStartIdx((prevIdx) => Math.min(prevIdx + 3, data.length - 3));
    };

    const visibleCards = data.slice(startIdx, startIdx + 3);

    return (


        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Button onClick={handlePrev} disabled={startIdx === 0}>
                    上一页
                </Button>
                <Title level={3} style={{color:"#cccccc"}}>Post Gallery</Title>
                <Button onClick={handleNext} disabled={startIdx === data.length - 3}>
                    下一页
                </Button>
            </div>
            <div>
                {
                    <Row>
                        {visibleCards.map((card,index) => (
                            <Col key={index }span={8}>
                                <PostCard data={card}/>
                            </Col>
                        ))}
                    </Row>
                }

            </div>

        </div>


    );
};

export default PostCardList;