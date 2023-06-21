import {Button, Form, Input, Select, Spin, Switch} from 'antd';
import { useRequest } from 'umi';
import MultipleImageUpload from './GroupUpload';
import {newPet} from "../../services/petService";
import {useState} from "react";
import {newPost} from "../../services/postService";
import UploadingProgress from "../../components/UploadingProgress";
import DoneUpload from "../../components/DoneUpload";


const { TextArea } = Input;
const clearFormValues = (form) => {
    form.resetFields();
};

const NewPet = () => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(false)
    const [done,setDone] = useState(false);
    const [percent,setPercent] = useState(0)
    const progress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        setPercent( Math.round((loaded / total) * 100))

    }
    const finish = async (values) => {
        console.log(values)
        setLoading(true)
        const {code}=await newPet(values,progress)
        if(code===1){
            setDone(true)
        }
        setLoading(false)
    };
    if(loading){
        return           (
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
                    <TextArea rows={4} />
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
