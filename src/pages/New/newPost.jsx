import {Button, DatePicker, Form, Input, Modal, Radio, Select, Space, TimePicker} from 'antd';
import moment from 'moment';
import MultipleImageUpload from './groupUpload';
import React from "react";
import DoneUpload from "../../components/DoneUpload";
import UploadingProgress from "../../components/UploadingProgress";
import './new.less'
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import usePost from "@/hooks/usePost";

const {TextArea} = Input;

const NewPost = () => {
    const {
        open,
        loading,
        done,
        percent,
        fileList,
        text,
        index,
        postNow,
        setPostNow,
        setFileList,
        setIndex,
        handleCancel,
        handleOk,
        handleChange,
        appendData,
        finish,
        options
    } = usePost();

    const disabledDate = (current) => {
        // Disable dates before today
        const today = moment().startOf('day');
        if (current < today) {
            return true;
        }

        // Disable dates more than one week in the future
        const oneWeekLater = today.clone().add(1, 'week').endOf('day');
        return current > oneWeekLater;
    };

    if (loading) {
        return (
            <UploadingProgress percent={percent}/>
        );
    }

    if (done) {
        return <DoneUpload path={"/post"}/>;
    }

    return (

        <div className={'new-page'}>
            <div className={'new-container'}>
                <Modal open={open} onOk={handleOk} onCancel={handleCancel} title="confirm leaving" okText="confirm"
                       cancelText="cancel">
                    你确定要离开当前页面吗？未保存的内容将会丢失。
                </Modal>
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
                >
                    <div className={'title'}>Content Editing</div>
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
                        <Select size={"large"} mode={"multiple"} className={'form-selector'} options={options}/>
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
                    <MultipleImageUpload limit={3} name={"images"} round={false} fileList={fileList}
                                         setFileList={setFileList}/>

                    <div className={'title'}>Post Setting</div>
                    <Form.Item label={"Visibility"} name={'visible'} initialValue={1}>
                        <Radio.Group>
                            <Radio value={1}>Public</Radio>
                            <Radio value={2}>Friend Only</Radio>
                            <Radio value={3}>Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={"PostTimeSelector"} name={'timeSelector'} initialValue={postNow}>
                        <Radio.Group onChange={e => setPostNow(e.target.value)}>
                            <Radio value={true}>Right Now</Radio>
                            <Radio value={false}>Later</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        !postNow &&      <div>
                            <Form.Item
                                label="Post Date"
                                name="date"
                                rules={[
                                    { required: true, message: 'Please select the post date!' },
                                    {
                                        validator: (_, value) => {
                                            const selectedDate = moment(value);
                                            if (selectedDate.isBefore(moment().startOf('day'))) {
                                                return Promise.reject('Post Date must be after today!');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <DatePicker disabledDate={disabledDate} />
                            </Form.Item>
                            <Form.Item
                                label="Post Time"
                                name="time"
                                rules={[
                                    { required: true, message: 'Please select the post time!' },
                                    {
                                        validator: (_, value) => {
                                             if(!value){
                                                 return Promise.reject('Please input validate time');
                                             }

                                            const currentTime = moment();
                                            const selectedTime = value;
                                            if (currentTime.isSame(selectedTime, 'day') && selectedTime.isBefore(currentTime)) {
                                                return Promise.reject('Post Time must be after the current time!');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <TimePicker format="HH:mm:ss"/>
                            </Form.Item>
                        </div>
                    }
                    <Form.Item>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Button danger style={{marginLeft: 200}} onClick={() => {
                            }}>
                                Save Draft
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

const ButtonSelectors = ({index, appendData, setIndex}) => {
    const disappear = () => {
        setIndex(0)
    }
    const showEmotion = (e) => {
        e.stopPropagation();
        setIndex(3)
    }

    if (index === 0) {
        return (
            <Space>
                <Button>@ Topic</Button>
                <Button onClick={showEmotion}>@ Emotion</Button>
            </Space>
        )
    } else if (index === 1) {
        return <div>
            话题
        </div>
    } else {
        return (
            <Picker data={data} onEmojiSelect={appendData} onClickOutside={disappear}/>
        )
    }
}
