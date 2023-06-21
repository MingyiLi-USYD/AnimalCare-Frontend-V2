import {Button, Form, Input, Progress, Select, Spin, Switch} from 'antd';
import { useRequest } from 'umi';
import {newPost} from '../../services/postService';
import MultipleImageUpload from './GroupUpload';
import {useState} from "react";
import DoneUpload from "../../components/DoneUpload";
import UploadingProgress from "../../components/UploadingProgress";

const { TextArea } = Input;
const clearFormValues = (form) => {
  form.resetFields();
};

const NewPost = () => {
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
     const {code}=await newPost(values,progress)
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

