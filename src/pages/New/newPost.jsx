import {Avatar, Button, DatePicker, Form, Input, Modal, Radio, Select, Space, TimePicker} from 'antd';
import moment from 'moment';
import MultipleImageUpload from './groupUpload';
import React, {useState} from "react";
import DoneUpload from "../../components/DoneUpload";
import UploadingProgress from "../../components/UploadingProgress";
import './new.less'
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import usePost from "@/hooks/usePost";
import {petOptions} from "@/pages/New/common";

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
    const [dates, setDates] = useState(null);
    const [times, setTimes] = useState(null);
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
    function isSameDay(dateA, dateB) {
        return dateA.year()===dateB.year()
            &&dateA.month()===dateB.month()
            &&dateA.date()===dateB.date();
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
                        name={'postTitle'}
                        rules={[{required: true, message: 'Please input your title !'}]}
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
                        label="Refer"
                        name={'referFriends'}
                        initialValue={[]}
                    >
                        <Select size={"large"} mode={"multiple"} className={'form-selector'} options={options}/>
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name={'postTag'}
                        rules={[{required: true, message: 'Please choose pet category !'}]}
                    >
                        <Select size={"large"} className={'form-selector'} options={petOptions}>
                        </Select>
                    </Form.Item>
                    <MultipleImageUpload limit={3} name={"images"} round={false} fileList={fileList}
                                         setFileList={setFileList}/>

                    <div className={'title'}>Post Setting</div>
                    <Form.Item label={"Visibility"} name={'visible'} initialValue={true}>
                        <Radio.Group>
                            <Radio value={true}>Public</Radio>
                            <Radio value={false}>Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={"PostTimeSelector"} name={'isDelay'} initialValue={postNow}>
                        <Radio.Group onChange={e => setPostNow(e.target.value)}>
                            <Radio value={false}>Right Now</Radio>
                            <Radio value={true}>Later</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        postNow && <div>
                            <Form.Item
                                label="Post Date"
                                name="date"
                                rules={[
                                    { required: true, message: 'Please select the post date!' },
                                    {
                                        validator: (_, value) => {
                                            if(!value){
                                               return  Promise.reject('Please select date first!')
                                            }
                                            const selectedDate = moment(value);
                                            if (selectedDate.isBefore(moment().startOf('day'))) {
                                                return Promise.reject('Post Date must be after today!');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <DatePicker key={1} value={dates} disabledDate={disabledDate}  onChange={(dateJs) => setDates(dateJs)}/>
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
                                            if(!dates){
                                                return Promise.reject('Please choose date first');
                                            }

                                            const currentTime = moment();

                                            if (isSameDay(times,dates) && value.isBefore(currentTime)) {
                                                return Promise.reject('Post Time must be after the current time!');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <TimePicker key={2} format="HH:mm:ss" value = {times} onChange={(dateJs) => setTimes(dateJs)}/>
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
