import {Button, Form, Input, Select, Spin, Switch} from 'antd';
import { useRequest } from 'umi';
import MultipleImageUpload from './GroupUpload';
import {newPet} from "../../services/petService";
import {useState} from "react";


const { TextArea } = Input;
const clearFormValues = (form) => {
    form.resetFields();
};

const NewPet = () => {
    const [form] = Form.useForm();
    const { run, loading, data } = useRequest(newPet, { manual: true });
    const [switchValue, setSwitchValue] = useState(true);

    const finish = (values) => {
        run(values);
        clearFormValues(form);
    };
    const onChange = (e)=>{
       setSwitchValue(e)
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
                    label="Visible"
                    name={'visible'}
                    rules={[{ required: true, message: 'Please choose visibility !' }]}
                >
                    <Switch checked={switchValue} onChange={onChange} />

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
