import {Avatar, Button, Space, Spin, Typography} from 'antd';
import {useDispatch, useModel, useParams, useRequest} from 'umi';
import PetCardList from './Components/petCardList';
import {getProfileById} from '@/services/userService';
import PostCardList from "./Components/postCardList";
import PostDetail from "./Components/postDetail";
import {useEffect, useState} from "react";
import {getFriendshipStatus} from "@/services/friendService";
import BackForward from "../../components/BackForward";
import RelationDetail from "./Components/relationDetail";
import './profile.less'
import {FollowerIcon, FollowIcon, PetIcon, PostIcon} from "@/assets/Icons/icon";

const {Title, Paragraph} = Typography;

const Profile = (props) => {
    const style = {
        height:'40px',
        width:'40px',
    }
    const params = useParams();
    const {id} = params;
    const [relation, setRelation] = useState(0);
    const {initialState: {currentUser}} = useModel('@@initialState');
    const dispatch = useDispatch();
    const userId = currentUser.userId
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
        dispatch({
            type: 'RelationModel/openModal',
        });
    }
    const handleDelete = () => {
       dispatch({
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
                <div className={'header'} >
                    <Space className={'avatar-info'}>
                        <Avatar src={data?.avatar} size={64}/>
                            <div  className={'operation'} >
                                <div>
                                    {
                                        relationList[relation]
                                    }
                                </div>
                                <div>
                                    {
                                        <Button type={"primary"}>Subscription</Button>
                                    }
                                </div>

                            </div>
                    </Space>
                    <Space className={'number-info'}>
                        <Space>
                            <PetIcon {...style}/>
                            <span className={'number'}>{`Pets: 5`}</span>
                        </Space>
                        <Space>
                            <PostIcon {...style}/>
                            <span className={'number'}>{`Posts: 5`}</span>
                        </Space>
                        <Space>
                            <FollowIcon {...style}/>
                            <span className={'number'}>{`Subscribe: 5`}</span>
                        </Space>
                        <Space>
                            <FollowerIcon {...style}/>
                            <span className={'number'}>{`Subscriber: 5`}</span>
                        </Space>
                    </Space>
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
