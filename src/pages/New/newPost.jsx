import {Avatar, Button, Form, Input, Select, Space, Switch, Upload} from 'antd';
import MultipleImageUpload from './groupUpload';
import React, {useState} from "react";
import DoneUpload from "../../components/DoneUpload";
import UploadingProgress from "../../components/UploadingProgress";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {auth, storage} from "@/firebaseConfig";
import {v4 as uuidv4} from "uuid";
import {newPost} from "@/services/postService";
import {getFirebaseIdToken} from "@/services/userService";
import {signInWithCustomToken} from "firebase/auth";
import {useModel, useSelector} from "umi";
import './new.less'
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
const {TextArea} = Input;

const NewPost = () => {
    const clearFormValues = (form) => {
          setFileList([])
         form.resetFields();
    };
    const {friendList} = useSelector(state => state.FriendModel)
    console.log(friendList)
    const {initialState: {currentUser}} = useModel('@@initialState');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false);
    const [percent, setPercent] = useState(0)
    const [fileList, setFileList] = useState([]);
    const [text,setText] = useState('')
    const [index, setIndex] = useState(0)

    const uploadMultipleImages = async (files) => {
        let totalSize = files.reduce((total, file) => total + file.originFileObj.size, 0);
        let uploadedSize = 0;
        const images = []
        try {
            const uploadPromises = files.map((file) => {
                const storageRef = ref(storage, currentUser.userName + '/' + uuidv4());
                const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const {bytesTransferred} = snapshot
                            const overallProgress = ((uploadedSize + bytesTransferred) / totalSize) * 100;
                            setPercent(Math.round(overallProgress))
                        },
                        (error) => {
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                images.push(downloadURL);
                                uploadedSize += uploadTask.snapshot.totalBytes;
                                resolve();
                            });
                        }
                    );
                })
            })
            await Promise.all(uploadPromises);
            return images;
        } catch (error) {
            throw error;
        }
    };

    const handleChange= (event)=>{
        const text = event.target.value;
        setText(text)
    }
    const appendData = (data) => {
        setText(text + data.native)
    }
    const options = [];
    for (let i = 0; i < friendList.length; i++) {
        options.push({
            value: friendList[i].id,
            label: <Space><Avatar src={friendList[i].avatar}/> <span>{friendList[i].nickname}</span></Space>,
        })

    }


        const finish = async (values) => {
        console.log(values)
        return
        if (!auth.currentUser) {
            const {data} = await getFirebaseIdToken()
            await signInWithCustomToken(auth, data)
        }
        setLoading(true)
        values.images = JSON.stringify(await uploadMultipleImages(values.images))
        const {code} = await newPost(values)
        if (code === 1) {
            setLoading(false)
            setDone(true)
        }
    };
    if (loading) {
        return (
            <UploadingProgress percent={percent}/>
        )
    }
    if (done) {
        return <DoneUpload path={"/post"}/>
    }
    return (

        <div className={'new-page'}>
            <div className={'new-container'}>
                <div className={'label'}>Create Photo story</div>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    layout="horizontal"
                    style={{
                        width: 800,
                    }}
                    onFinish={finish}
                    form={form}
                >
                    <Form.Item
                        label="Title"
                        name={'topic'}
                        rules={[{required: true, message: 'Please input your topic !'}]}
                    >
                        <Input showCount maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name={'postContent'}
                        rules={[{required: true, message: 'Please input your content !'}]}
                    >
                        <div>
                            <TextArea showCount
                                      maxLength={1000}
                                      value={text}
                                      onChange={handleChange}
                                      style={{
                                          height: 120,
                                          resize: 'none',
                                      }}/>
                            <ButtonSelectors index={index} setIndex={setIndex} appendData={appendData}/>
                        </div>

                    </Form.Item>
                    <Form.Item
                        label="Share"
                        name={'share'}
                        initialValue={[]}
                    >
                        <Select size={"large"} mode={"multiple"} className={'form-selector'}  options={options} />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name={'tag'}
                        rules={[{required: true, message: 'Please choose pet category !'}]}
                    >
                        <Select size={"large"} className={'form-selector'}>
                            <Select.Option value="cat">Cat</Select.Option>
                            <Select.Option value="dog">Dog</Select.Option>
                        </Select>
                    </Form.Item>
                    <MultipleImageUpload limit={3} name={"images"} round={false} fileList={fileList} setFileList={setFileList}/>
                    <Form.Item
                        valuePropName="checked"
                        getValueProps={value => value}
                        label="Visible"
                        name={'visible'}
                        initialValue={true}
                    >
                        <Switch defaultChecked={true}/>
                    </Form.Item>
                    <Form.Item>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Button danger style={{marginLeft: 200}} onClick={() => clearFormValues(form)}>
                                Cancel
                            </Button>
                            <Button type={'primary'} htmlType="submit">
                                Upload
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default () => <NewPost/>;

const ButtonSelectors = ({index,appendData,setIndex})=>{
    const disappear = ()=>{
        setIndex(0)
    }
    const showEmotion = (e)=>{
        e.stopPropagation();
        setIndex(3)
    }

      if(index ===0){
          return(
              <Space>
                  <Button>@ Topic</Button>
                  <Button onClick={showEmotion}>@ Emotion</Button>
              </Space>
          )
      }else if(index === 1){
          return <div>
              话题
          </div>
      }else {
          return (
              <Picker data={data} onEmojiSelect={appendData} onClickOutside={disappear} />
          )
      }
}
