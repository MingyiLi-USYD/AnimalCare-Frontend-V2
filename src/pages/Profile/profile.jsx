import {Avatar, Button, Spin, Typography} from 'antd';
import {useModel, useParams, useRequest} from 'umi';
import PetCardList from './Components/petCardList';
import {getProfileById} from '@/services/userService';
import PostCardList from "./Components/postCardList";
import PostDetail from "./Components/postDetail";
import {useEffect, useState} from "react";
import {getFriendshipStatus} from "@/services/friendService";
import BackForward from "../../components/BackForward";
import RelationDetail from "./Components/relationDetail";
import './profile.less'

const {Title, Paragraph} = Typography;

const Profile = (props) => {
    const params = useParams();
    const {id} = params;
    const [relation, setRelation] = useState(0);
    const {initialState: {currentUser}} = useModel('@@initialState');
    const userId = currentUser.id
    const {run, loading, data} = useRequest(getProfileById, {manual: true});
    useEffect(() => {
        run(id)
        if (id !== userId) {
            handleCheckRelation(id)
        } else {
            setRelation(0)
        }
    }, [id])
    const handleCheckRelation = async (toId) => {
        const res = await getFriendshipStatus(toId)
        setRelation(res.data)
    }

    const handleAdd = () => {
        props.dispatch({
            type: 'RelationModel/openModal',
        });
    }
    const handleDelete = () => {
        props.dispatch({
            type: 'RelationModel/openModal',
        });
    }

    const relationList = [null, <Button key={1} danger onClick={handleDelete}>Delete</Button>
        , <Button key={2} type={"primary"} disabled={true}>Pending</Button>
        , <Button key={3} type={"primary"} onClick={handleAdd}>Add</Button>]
    if (!data) {
        return <Spin>loading</Spin>
    }
    return (
        <div className={'profile-page'}>

            <div className={'profile-container'}>
                <BackForward/>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Avatar src={data?.avatar} size={64}/>
                    {
                        relationList[relation]
                    }
                </div>

                <Title level={3}>{data.nickname}</Title>
                <Paragraph>{data?.description}</Paragraph>
                <PostCardList data={data?.postList} avatar={currentUser.avatar}/>
                <PetCardList data={data?.petList}/>

                <PostDetail/>
                <RelationDetail userId={data.userId} relation={relation} avatar={data.avatar} nickname={data.nickname}
                                setRelation={setRelation}/>
            </div>
        </div>

    );
};

export default Profile
