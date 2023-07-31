import {connect} from 'dva';
import {Avatar, Button, Modal} from "antd";
import React, {useRef} from "react";
import {deleteFriend, sendFriendRequest} from "@/services/friendService";
import {useModel} from "umi";


const RelationDetail = ({userId,nickname,avatar,relation,dispatch,open,setRelation}) => {
    const { initialState:{currentUser} } = useModel('@@initialState');

    const closeModal = ()=>{
        dispatch({
            type: 'RelationModel/closeModal',
        });
    }
    const textareaRef = useRef(null)
    const handleAdd = ()=>{

        const msg = textareaRef.current.value
        sendFriendRequest(userId,msg).then(()=>{
            closeModal()
            setRelation(2)
        })
    }

    const handleDelete =  ()=>{

        deleteFriend(userId).then(()=>{
            closeModal()
            setRelation(3)
            dispatch({
                type:'ChatModel/onDeleteFriend',
                payload: {id:userId}
            })
        })
    }
    const nicknameStyle = {
        fontSize: '1.2em',  // 放大字体
        color: 'red',  // 设置颜色为红色
    };
      return (
          <Modal
              footer={[relation===3?<Button onClick={handleAdd} key={1} type={"primary"}>Send</Button>:<Button key={2} onClick={handleDelete} danger>Delete</Button>]}
              title={relation===3?'Send a friend request':'Delete a friend'}
              open={open}
              onCancel={closeModal}
              onOk={closeModal}
          >

               <div className={'friend-operation-dialog'}>
                   <Avatar size={100} src={avatar}/>
                   <div className={'nickname'}>{nickname}</div>
                   {relation===3?<textarea ref={textareaRef} style={{ resize: 'none',width:'60%' }}
                              rows={4} defaultValue={`Hello! I'm ${currentUser.nickname}`}/>:
                       <p>
                           Are you sure to delete your friend: {' '}
                           <span style={nicknameStyle}>{nickname}</span>
                       </p>}

               </div>
          </Modal>
   )

};
export default connect(({ RelationModel }) => {
    return { ...RelationModel };
})(RelationDetail);

