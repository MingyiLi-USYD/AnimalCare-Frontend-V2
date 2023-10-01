import {Avatar, Space, Spin, Typography} from 'antd';
import {useModel, useParams, useRequest} from 'umi';
import PetCardList from './Components/petCardList';
import {getProfileById} from '@/services/userService';
import PostCardList from "./Components/postCardList";
import {useEffect} from "react";
import BackForward from "../../components/BackForward";
import './profile.less'
import {FollowerIcon, FollowIcon, PetIcon, PostIcon} from "@/assets/Icons/icon";
import Relation from "@/pages/Profile/Components/relation";

const {Title, Paragraph} = Typography;

const Profile = (props) => {
    const style = {
        height: '40px',
        width: '40px',
    }
    const params = useParams()
    const {id} = params
    const {initialState: {currentUser}} = useModel('@@initialState')
    const {run, loading, data} = useRequest(getProfileById, {manual: true})
    useEffect(() => {
        run(id)
    }, [id])
    if (!data) {
        return <Spin>loading</Spin>
    }
    return (
        <div className={'profile-page'}>

            <div className={'profile-container'}>
                <BackForward/>
                <div className={'header'}>
                    <Space className={'avatar-info'}>
                        <Avatar src={data?.avatar} size={64}/>
                        <Relation {...data}/>
                    </Space>
                    <Space className={'number-info'}>
                        <Space>
                            <PetIcon {...style}/>
                            <span className={'number'}>{`Pets: ${data.petList.length}`}</span>
                        </Space>
                        <Space>
                            <PostIcon {...style}/>
                            <span className={'number'}>{`Posts: ${data.postList.length}`}</span>
                        </Space>
                        <Space>
                            <FollowIcon {...style}/>
                            <span className={'number'}>{`Subscribe:${data.subscribeIdList.length}`}</span>
                        </Space>
                        <Space>
                            <FollowerIcon {...style}/>
                            <span className={'number'}>{`Subscriber: ${data.subscriberIdList.length}`}</span>
                        </Space>
                    </Space>
                </div>
                <Title level={3}>{data.nickname}</Title>
                <Paragraph>{data?.description}</Paragraph>
                <PostCardList data={data?.postList} avatar={currentUser.avatar}/>
                <PetCardList data={data?.petList}/>


            </div>
        </div>

    );
};

export default Profile

