import {Button, Form, Input, Select, Spin, Switch} from 'antd';
import MultipleImageUpload from './GroupUpload';
import {newPet} from "../../services/petService";
import {useState} from "react";
import UploadingProgress from "../../components/UploadingProgress";
import DoneUpload from "../../components/DoneUpload";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth, storage} from "../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import {getFirebaseIdToken} from "../../services/userService";
import {signInWithCustomToken} from "firebase/auth"
import {useModel} from "umi";
const { TextArea } = Input;
const clearFormValues = (form) => {
    form.resetFields();
};

const NewPet = () => {
    const {initialState:{currentUser} } = useModel('@@initialState');
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(false)
    const [done,setDone] = useState(false);
    const [percent,setPercent] = useState(0)
    const uploadCallback = (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =  Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(progress)
        switch (snapshot.state) {
            case 'paused':
                break;
            case 'running':
                break;
        }
    }
    const uploadError = (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;
            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
        }
    }
    const finish = async (values) => {
        if(!auth.currentUser){
           const {data} = await getFirebaseIdToken()
            await signInWithCustomToken(auth,data)
        }
        setLoading(true)
        const storageRef = ref(storage, currentUser.userName +'/'+ uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, values.avatar[0].originFileObj)
        uploadTask.on('state_changed',
            uploadCallback,
            uploadError,
            async () =>  {
                // Upload completed successfully, now we can get the download URL
                values.image = await getDownloadURL(uploadTask.snapshot.ref)
                const {code} =await newPet(values)
                if(code===1){
                    setLoading(false)
                    setDone(true)
                }

            }
        );
    };
    if(loading){
        return   (
            <UploadingProgress percent={percent}/>
        )
    }
    if(done){
        return <DoneUpload path={"/pet"}/>
    }


    return (
        <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',}}>
            <Button onClick={()=>{console.log(auth.currentUser)}}>查看auth</Button>
            <Button onClick={()=>{auth.signOut()}}>退出auth</Button>
            <Form
                form={form}
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
            >
                <MultipleImageUpload limit={1} name={"avatar"} round = {true}/>
                <Form.Item
                    label="Name"
                    name={'petName'}
                    rules={[{ required: true, message: 'Please input your topic !' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name={'petDescription'}
                    rules={[{ required: true, message: 'Please input your content !' }]}
                >
                    <TextArea rows={4} maxLength={250} showCount/>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={'category'}
                    rules={[{ required: true, message: 'Please choose pet category !' }]}
                >
                    <Select>
                        <Select.Option value="cat">Cat</Select.Option>
                        <Select.Option value="dog">Dog</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    valuePropName="checked"
                    getValueProps={value=> value}
                    label="Visible"
                    name={'petVisible'}
                    initialValue={true}
                >
                    <Switch defaultChecked={true} />
                </Form.Item>

                <Form.Item >
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
            {loading && <Spin />}
        </div>
    );
};
export default () => <NewPet />;
