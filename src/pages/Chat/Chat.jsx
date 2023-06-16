import {connect} from 'umi';
import {sendMessageToServer} from "../../services/chatService";
import './Chat.less'
import {Avatar, Button, Col, Row} from 'antd';
import React, {useRef, useState} from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {FileAddOutlined, SmileOutlined} from "@ant-design/icons";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import RecentChatFriendList from "./RecentChatFriendList";

const Chat = (props) => {

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
    const message = {
      userId:me.id,
      date:new Date().getTime(),
      type: 'text',
      content: text,

    }
    sendMessageToServer({toId:contact.id,message})
    dispatch({
      type: 'ChatModel/onSend',
      payload: { message, contact },
    });
    setText('')
  };

  const appendData = (data)=>{
    setText(text+data.native)
    setEmo(false)
  }
return(
    <div
        className={"chatContainer"}
    >

        <div className={'fixed-div'} >
          <RecentChatFriendList/>
        </div>
      {
          Object.keys(contact).length !== 0&&
          <div className={'flexible-div'}>
            <Row>
              <Col span={24}>
                <ChatHeader contact={contact}/>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ChatContent/>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
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
                  <textarea
                      className={'myInput'}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="输入文字和表情..."
                  />
                  {/*<ReactQuill ref={quillRef}  className={'myInput'} value={text} onChange={e=>setText(e)}/>*/}
                  <div style={{height:'15%'}} >
                    <Button type="primary" disabled={text===''} onClick={handleSend}>Submit</Button>
                  </div>


                </div>
              </Col>
            </Row>

          </div>
      }

    </div>
)
};

export default connect(
  ({ ChatModel: { chatRecord, friendLists, contact, me } }) => {
    return { chatRecord, friendLists, contact, me };
  },
)(Chat);
