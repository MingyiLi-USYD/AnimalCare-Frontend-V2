import { Button, Form, Input, Select, Spin } from 'antd';
import { useRequest } from 'umi';
import {newPost} from '../../services/postService';
import MultipleImageUpload from './GroupUpload';

const { TextArea } = Input;
const clearFormValues = (form) => {
  form.resetFields();
};

const NewPost = () => {
  const [form] = Form.useForm();
  const { run, loading, data } = useRequest(newPost, { manual: true });
    const finish = (values) => {
    run(values);
    clearFormValues(form);
  };

  return (

    <div style={{display: 'flex',
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',}}>
      <div style={{marginBottom:100}}>New Post</div>
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
        <Form.Item
          label="Title"
          name={'postTopic'}
          rules={[{ required: true, message: 'Please input your topic !' }]}
        >
          <Input  style={{width:"50%"}} />
        </Form.Item>
        <Form.Item
          label="Content"
          name={'postContent'}
          rules={[{ required: true, message: 'Please input your content !' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
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
      {loading && <Spin />}
    </div>
  );
};
export default () => <NewPost />;
