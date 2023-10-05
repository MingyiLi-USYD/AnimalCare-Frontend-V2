import rabbit from '../../assets/images/rabbit.png'
import cat from '../../assets/images/cat.png'
import dog from '../../assets/images/dog.png'
import parrot from '../../assets/images/parrot.png'
import chick from '../../assets/images/chick.png'
import hamster from '../../assets/images/hamster.png'
import turtle from '../../assets/images/turtle.png'
import {Avatar, Space} from "antd";

export const petOptions = [

    {
        value: 'Cat',
        label: <Space><Avatar src={cat}/><span>Cat</span></Space>,
    },
    {
        value: 'Dog',
        label: <Space><Avatar src={dog}/><span>Dog</span></Space>,
    },
    {
        value: 'Rabbit',
        label: <Space><Avatar src={rabbit}/><span>Rabbit</span></Space>,
    },
    {
        value: 'Parrot',
        label: <Space><Avatar src={parrot}/><span>Parrot</span></Space>,
    },
    {
        value: 'Chick',
        label: <Space><Avatar src={chick}/><span>Chick</span></Space>,
    },
    {
        value: 'Hamster',
        label: <Space><Avatar src={hamster}/><span>Hamster</span></Space>,
    },
    {
        value: 'Turtle',
        label: <Space><Avatar src={turtle}/><span>Turtle</span></Space>,
    },

]