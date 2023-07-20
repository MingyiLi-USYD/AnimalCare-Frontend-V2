import {Button, Form, Input, Select, Switch} from 'antd';
import MultipleImageUpload from './GroupUpload';
import {useEffect, useState} from "react";
import DoneUpload from "../../components/DoneUpload";
import UploadingProgress from "../../components/UploadingProgress";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {auth, storage} from "@/firebaseConfig";
import {v4 as uuidv4} from "uuid";
import {newPost} from "@/services/postService";
import {getFirebaseIdToken} from "@/services/userService";
import {signInWithCustomToken} from "firebase/auth";
import {useModel} from "umi";

const { TextArea } = Input;
const clearFormValues = (form) => {
    form.resetFields();
};


const NewPost = () => {
    const {initialState:{currentUser} } = useModel('@@initialState');
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(false)
    const [done,setDone] = useState(false);
    const [percent,setPercent] = useState(0)

    const uploadMultipleImages = async (files) => {
        let totalSize = files.reduce((total, file) => total + file.originFileObj.size, 0);
        let uploadedSize = 0;
        const images = []
        try {
            const uploadPromises =  files.map((file)=>{
                const storageRef = ref(storage, currentUser.userName + '/' + uuidv4());
                const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const  {bytesTransferred}= snapshot
                            const overallProgress = ((uploadedSize+ bytesTransferred)/ totalSize) * 100;
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
        }catch (error) {
            throw error;
        }
    };

    const finish = async (values) => {
        if(!auth.currentUser){
            const {data} = await getFirebaseIdToken()
            await signInWithCustomToken(auth,data)
        }
        setLoading(true)
        values.images=JSON.stringify(await uploadMultipleImages(values.images))
        const {code}=await newPost(values)
        if(code===1){
            setLoading(false)
            setDone(true)
        }
    };
    if(loading){
        return           (
            <UploadingProgress percent={percent}/>
        )
    }
    if(done){
        return <DoneUpload path={"/post"}/>
    }
    return (

        <div style={{display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',}}>
            <div style={{marginBottom:100}}>New Post</div>
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
                    name={'postTopic'}
                    rules={[{ required: true, message: 'Please input your topic !' }]}
                >
                    <Input  style={{width:"50%"}} />
                </Form.Item>
{/*                <Form.Item
                    label="Content"
                    name={'postContent'}
                    rules={[{ required: true, message: 'Please input your content !' }]}
                >
                    <TextArea showCount
                              maxLength={1000}
                              style={{
                                  height: 120,
                                  resize: 'none',
                              }}/>
                </Form.Item>*/}
                <Form.Item
                    label="Category"
                    name={'postTag'}
                    rules={[{ required: true, message: 'Please choose pet category !' }]}
                >
                    <Select size={"large"} style={{width:"30%"}}>
                        <Select.Option value="cat">Cat</Select.Option>
                        <Select.Option value="dog">Dog</Select.Option>
                    </Select>
                </Form.Item>
                <MultipleImageUpload limit={3} name={"images"} round = {false}/>
                <Form.Item
                    valuePropName="checked"
                    getValueProps={value=> value}
                    label="Visible"
                    name={'visible'}
                    initialValue={true}
                >
                    <Switch defaultChecked={true} />
                </Form.Item>
                <Form.Item>
                    <div  style={{display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Button danger style={{marginLeft:200}} onClick={()=>clearFormValues(form)}>
                            Cancel
                        </Button>
                        <Button type={'primary'} htmlType="submit">
                            Upload
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
export default () => <NewPost />;

