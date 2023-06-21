import {Avatar, Button, Modal, Spin, Typography} from 'antd';
import {connect, useRequest} from 'umi';
import PetCardList from './Components/PetCardList';
import {getProfileById} from '../../services/userService';
import PostCardList from "./Components/PostList";
import {useModel, useParams} from "umi";
import PostDetail from "./Components/PostDetail";
import {useEffect, useState} from "react";
import {getFriendshipStatus} from "../../services/friendService";
import BackForward from "../../components/BackForward";
import RelationDetail from "./Components/RelationDetail";
import './Profile.less'

const { Title, Paragraph } = Typography;

const Profile = (props) => {
    const params = useParams();
    const { id } = params;
    const [relation,setRelation] = useState(0);
    const {initialState:{currentUser} } = useModel('@@initialState');
    const userId = currentUser.id
    const {run,loading,data} =useRequest(getProfileById,{manual:true});
    useEffect(()=>{
        run(id)
        if(id!==userId){
            handleCheckRelation(id)
        }else {
            setRelation(0)
        }
    },[id])
    const handleCheckRelation = async (toId)=>{
       const res= await getFriendshipStatus(toId)
       setRelation(res.data)
    }


    const  handleAdd = () => {
        props.dispatch({
            type: 'RelationModel/openModal',
        });
    }
    const  handleDelete = () => {
        props.dispatch({
            type: 'RelationModel/openModal',
        });
    }

    const relationList = [null,<Button key={1} danger onClick={handleDelete} >Delete</Button>
        ,<Button key={2} type={"primary"} disabled={true}>Pending</Button>
        ,<Button key={3} type={"primary"} onClick={handleAdd}>Add</Button> ]
  if(!data){
      return <Spin>loading</Spin>
  }
  return (

    <div className={'my-profile'}>
        <BackForward/>
        <div style={{display:"flex",alignItems:"center"}}>
            <Avatar src={data?.avatar} size={64} />
            {
                relationList[relation]
            }
        </div>

      <Title level={3}>{data.nickname}</Title>
      <Paragraph>{data?.description}</Paragraph>
      <PetCardList data={data?.petList} />
      <PostCardList data={data?.postList}/>
      <PostDetail/>
      <RelationDetail userId={data.id} relation={relation} avatar={data.avatar} nickname={data.nickname} setRelation={setRelation}  />
    </div>
  );
};

export default connect(() => {
    return {};
})(Profile);
