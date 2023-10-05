import React, {useEffect, useState} from "react";
import {history, useSelector} from 'umi';
import {Avatar, Space} from "antd";
import {newPost} from "@/services/postService";


const usePost = () => {
    const {friendList} = useSelector(state => state.friendModel);
    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);
    const [percent, setPercent] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [target, setTarget] = useState('');
    const [lock, setLock] = useState(false);
    const [postNow, setPostNow] = useState(false);
    const [loading, setLoading] = useState(false)
    const callback = (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${percentCompleted}%`);
        setPercent(percentCompleted)
    }

    useEffect(() => {
        setLock(false);
        if (text.length > 0) {
            const unblock = history.block(({location}) => {
                setOpen(true);
                setTarget(location.pathname);
                unblock();
            });
            return () => {
                unblock();
            };
        }
    }, [text, lock]);

    const handleCancel = () => {
        setLock(true);
        setOpen(false);
    };

    const handleOk = () => {
        setOpen(false);
        history.push(target);
    };


    const handleChange = (event) => {
        const text = event.target.value;
        setText(text);
    };

    const appendData = (data) => {

        setText(text + data.native);
    };

    const finish = async (values) => {

        if (postNow) {
            // If "Later" is selected, combine the selected date and time into a timestamp
            const datePart = values.date.format("YYYY-MM-DD");
            const timePart = values.time.format("HH:mm:ss");
            values.estimateDate = `${datePart} ${timePart}`
        }
        setLoading(true)
        const {code} = await newPost(values, callback)
        if (code===1){
            setLoading(false)
            setDone(true)
        }

    };

    const options = [];
    for (let i = 0; i < friendList.length; i++) {
        const user = friendList[i].friendInfo
        options.push({
            value: user.userId,
            label: <Space><Avatar src={user.avatar}/> <span>{user.nickname}</span></Space>,
        });
    }


    return {
        open,
        loading,
        done,
        percent,
        fileList,
        text,
        index,
        target,
        lock,
        postNow,
        setLock,
        setPostNow,
        setOpen,
        setTarget,
        setFileList,
        setText,
        setIndex,
        handleCancel,
        handleOk,
        handleChange,
        appendData,
        finish,
        options
    };
};

export default usePost;
