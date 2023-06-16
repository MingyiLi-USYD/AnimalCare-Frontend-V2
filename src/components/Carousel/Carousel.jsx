import React, { useState } from 'react';
import { Card, Button, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


const CardCarousel = () => {
    const [currentCard, setCurrentCard] = useState(0);

    const handlePrev = () => {
        setCurrentCard(currentCard - 1);
    };

    const handleNext = () => {
        setCurrentCard(currentCard + 1);
    };

    return (
        <div className="card-carousel">
            <Button
                className="carousel-button"
                disabled={currentCard === 0}
                onClick={handlePrev}
                icon={<LeftOutlined />}
            />
            <Carousel
                dots={false}
                arrows={false}
                infinite
                draggable
                beforeChange={(from, to) => setCurrentCard(to)}
            >
                <Card className="carousel-card">Card 1</Card>
                <Card className="carousel-card">Card 2</Card>
                <Card className="carousel-card">Card 3</Card>
                <Card className="carousel-card">Card 4</Card>
                <Card className="carousel-card">Card 5</Card>
                <Card className="carousel-card">Card 6</Card>
            </Carousel>
            <Button
                className="carousel-button"
                disabled={currentCard === 3}
                onClick={handleNext}
                icon={<RightOutlined />}
            />
        </div>
    );
};

export default CardCarousel;