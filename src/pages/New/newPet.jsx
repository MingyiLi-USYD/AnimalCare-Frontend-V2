import {Button, DatePicker, Form, Input, Select, Spin, Switch} from 'antd';
import MultipleImageUpload from './groupUpload';
import {newPet} from "@/services/petService";
import React, {useState} from "react";
import UploadingProgress from "../../components/UploadingProgress";
import DoneUpload from "../../components/DoneUpload";
import {useModel} from "umi";

const {TextArea} = Input;


const NewPet = () => {

    const [fileList, setFileList] = useState([]);
    const {initialState: {currentUser}} = useModel('@@initialState');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false);
    const [percent, setPercent] = useState(0)
    const clearFormValues = (form) => {
        setFileList([])
        form.resetFields();
    };

    const callback = (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${percentCompleted}%`);
        setPercent(percentCompleted)
    }

    const finish = async (values) => {

        setLoading(true)
        values.birthday = values.birthday.format("YYYY-MM-DD");

        const {code} = await newPet(values,callback)
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
        return <DoneUpload path={"/pet"}/>
    }


    return (
        <div className={'new-page'}>
            <div className={'new-container'}>
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
                    <MultipleImageUpload limit={1} name={"avatar"} round={true} fileList={fileList}
                                         setFileList={setFileList}/>
                    <Form.Item
                        label="Name"
                        name={'petName'}
                        rules={[{required: true, message: 'Please input your topic !'}]}
                    >
                        <Input showCount maxLength={50}/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name={'petDescription'}
                        rules={[{required: true, message: 'Please input your content !'}]}
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
                        rules={[{required: true, message: 'Please choose pet category !'}]}
                    >
                        <Select className={'form-selector'}>
                            <Select.Option value="cat">Cat</Select.Option>
                            <Select.Option value="dog">Dog</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        valuePropName="checked"
                        getValueProps={value => value}
                        label="Visible"
                        name={'petVisible'}
                        initialValue={true}
                    >
                        <Switch defaultChecked={true}/>
                    </Form.Item>
                    <Form.Item
                        label="Pet Birthday"
                        name="birthday"
                        rules={[
                            {required: true, message: 'Please fill the birthday !'},
                        ]}
                    >
                        <DatePicker/>
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
            {loading && <Spin/>}
        </div>
    );
};
export default () => <NewPet/>;
