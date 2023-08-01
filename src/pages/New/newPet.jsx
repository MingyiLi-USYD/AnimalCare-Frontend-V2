import {Button, DatePicker, Form, Input, Select, Spin, Switch} from 'antd';
import MultipleImageUpload from './groupUpload';
import {newPet} from "@/services/petService";
import React, {useState} from "react";
import UploadingProgress from "../../components/UploadingProgress";
import DoneUpload from "../../components/DoneUpload";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {auth, storage} from "@/firebaseConfig";
import {v4 as uuidv4} from 'uuid';
import {getFirebaseIdToken} from "@/services/userService";
import {signInWithCustomToken} from "firebase/auth"
import {useModel} from "umi";
import moment from "moment/moment";
const { TextArea } = Input;


const NewPet = () => {

    const [fileList, setFileList] = useState([]);
    const {initialState:{currentUser} } = useModel('@@initialState');
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(false)
    const [done,setDone] = useState(false);
    const [percent,setPercent] = useState(0)
    const clearFormValues = (form) => {
        setFileList([])
        form.resetFields();
    };
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
        values.birthday = values.birthday.format("YYYY-MM-DD");
        const avatarFile = currentUser.username +'/'+ uuidv4()
        const storageRef = ref(storage,avatarFile );
        const uploadTask = uploadBytesResumable(storageRef, values.avatar[0].originFileObj)
        uploadTask.on('state_changed',
            uploadCallback,
            uploadError,
            async () =>  {
                // Upload completed successfully, now we can get the download URL
                values.petAvatar = await getDownloadURL(uploadTask.snapshot.ref)
                values.avatarFile = avatarFile
                console.log(values)
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
        <div className={'new-page'}>
            <div className={'new-container'}>
       {/*         <Button onClick={()=>{console.log(auth.currentUser)}}>查看auth</Button>
                <Button onClick={()=>{auth.signOut()}}>退出auth</Button>*/}
                <div className={'label'}>
                    Create Pet Profile
                </div>
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
                    <MultipleImageUpload limit={1} name={"avatar"} round = {true} fileList={fileList} setFileList={setFileList}/>
                    <Form.Item
                        label="Name"
                        name={'petName'}
                        rules={[{ required: true, message: 'Please input your topic !' }]}
                    >
                        <Input  showCount maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={'petDescription'}
                        rules={[{ required: true, message: 'Please input your content !' }]}
                    >
                        <TextArea showCount maxLength={500}
                                  style={{
                                      height: 120,
                                      resize: 'none',
                                  }}/>
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name={'category'}
                        rules={[{ required: true, message: 'Please choose pet category !' }]}
                    >
                        <Select className={'form-selector'}>
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
                    <Form.Item
                        label="Pet Birthday"
                        name="birthday"
                        rules={[
                            { required: true, message: 'Please fill the birthday !' },
                        ]}
                    >
                        <DatePicker/>
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
            </div>
            {loading && <Spin />}
        </div>
    );
};
export default () => <NewPet />;
