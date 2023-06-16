import {connect} from 'umi';
import FriendList from './FriendList';
import {sendMessageToServer} from "../../services/chatService";
import './Friend.less'
import {Avatar, Button, Col, Input, Row, Space} from 'antd';
import Chat from "./Chat";
import React, {useRef, useState} from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {SmileOutlined,FileAddOutlined} from "@ant-design/icons";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Friend = (props) => {


  const { contact, dispatch, me } = props;
  const[emo,setEmo] = useState(false)
  const [text,setText] = useState('')
  const quillRef = useRef(null);
  const handleSend = () => {
    const editor = quillRef.current.getEditor();
    const html = editor.root.innerHTML;
    if (html.trim() === '') {
      // 内容为空
      return
    }
    const msg=  {
      _id: '75b5bde8f3b9ef7aa9b704492cb28bae',
      date: 10,
      user: me,
      message: { type: 'text', content: text},
    }
    sendMessageToServer({ toId: contact.id, message: msg })
    dispatch({
      type: 'ChatModel/onSend',
      payload: { msg, contact },
    });
    setText('')
  };

  const appendData = (data)=>{
    setText(text+data.native)
    setEmo(false)
  }
return(
    <div
        style={{
          background: '#F5F7FA',
        /*  display:"flex"*/
        }}
        className={"friendsContainer"}
    >
      <Row className={'myRow'}>
        <Col span={6}>
          <FriendList />
        </Col>
        <Col span={18}>
          <div className={'chatHeader'}>
            <Avatar size={64} src={contact.avatar}/>
              <span>{contact.nickname}</span>
          </div>
          <Chat/>
          <div className={'chatInput'}>
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999, // 设置 z-index 来确保组件在父组件的上面
              }}>
                {
                    emo&&
                    <Picker onClickOutside={()=>setEmo(false)} data={data} onEmojiSelect={appendData} />
                }
              </div>


              <div  className={'toolBar'}>
                <SmileOutlined style={{fontSize:25,marginLeft:10}} onClick={(e)=>{
                  e.stopPropagation()
                  setEmo(true)
                }} />
                <FileAddOutlined style={{fontSize:25,marginLeft:10}} />
              </div>
            <ReactQuill ref={quillRef}  className={'myInput'} value={text} onChange={e=>setText(e)}/>
            <div style={{height:'15%'}} >
                <Button type="primary" disabled={text===''} onClick={handleSend}>Submit</Button>
            </div>


          </div>
        </Col>
      </Row>
    </div>
)
};

export default connect(
  ({ ChatModel: { chatRecord, friendLists, contact, me } }) => {
    return { chatRecord, friendLists, contact, me };
  },
)(Friend);


/*  return (
    <div style={{height:'100%',width:'100%',backgroundColor:'blue' }}>


      <div>
        {/!*        <Chat
          contact={contact}
          me={me}
          chatList={getChatListByUser(chatRecord, contact)?.messageLists}
          onSend={(msg) => handleSend(msg)}
          onEarlier={() => {}}
          onImage={(files) => {}}
          style={{
            width: 600,
            height:'1000',
            backgroundColor:'#dff7f5'
          }}
        />*!/}
      </div>
     <div style={{ flex: '0 0 300px' }}>
        <FriendList />
      </div>
    </div>
  );*/