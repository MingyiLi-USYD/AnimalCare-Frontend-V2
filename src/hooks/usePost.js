import React, { useState, useEffect } from "react";
import {useModel, useSelector} from 'umi';
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@/firebaseConfig";
import { getFirebaseIdToken } from "@/services/userService";
import { signInWithCustomToken } from "firebase/auth";
import {history} from "umi";
import {Avatar, Space} from "antd";
import moment from "moment/moment";
import {newPost} from "@/services/postService";


const usePost = () => {
    const { friendList } = useSelector(state => state.FriendModel);
    const { initialState: { currentUser } } = useModel('@@initialState');

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [percent, setPercent] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [target, setTarget] = useState('');
    const [lock, setLock] = useState(false);
    const [postNow, setPostNow] = useState(true);

    useEffect(() => {
        setLock(false);
        if (text.length > 0) {
            const unblock = history.block(({ location }) => {
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

    const uploadMultipleImages = async (files) => {
        let totalSize = files.reduce((total, file) => total + file.originFileObj.size, 0);
        let uploadedSize = 0;
        const images = [];
        try {
            const uploadPromises = files.map((file) => {
                const storageRef = ref(storage, currentUser.userName + '/' + uuidv4());
                const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const { bytesTransferred } = snapshot;
                            const overallProgress = ((uploadedSize + bytesTransferred) / totalSize) * 100;
                            setPercent(Math.round(overallProgress));
                        },
                        (error) => {
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                images.push(downloadURL);
                                uploadedSize += uploadTask.snapshot.totalBytes;
                                resolve();
                            });
                        }
                    );
                });
            });
            await Promise.all(uploadPromises);
            return images;
        } catch (error) {
            throw error;
        }
    };

    const handleChange = (event) => {
        const text = event.target.value;
        setText(text);
    };

    const appendData = (data) => {

        setText(text + data.native);
    };

    const finish = async (values) => {
       // console.log(values)
        let dateTimeCombined = null
        if (!postNow) {
            // If "Later" is selected, combine the selected date and time into a timestamp
            const datePart = values.date.format("YYYY-MM-DD");
            const timePart = values.time.format("HH:mm:ss");
            dateTimeCombined = `${datePart} ${timePart}`;
           // console.log(dateTimeCombined)
        }
        if (!auth.currentUser) {
            const { data } = await getFirebaseIdToken();
            await signInWithCustomToken(auth, data);
        }
        setLoading(true);
        values.images = JSON.stringify(await uploadMultipleImages(values.images));
        console.log(values)
        const { code } = await newPost(values,dateTimeCombined);
        if (code === 1) {
            setLoading(false);
            setDone(true);
        }
    };

    const options = [];
    for (let i = 0; i < friendList.length; i++) {
        options.push({
            value: friendList[i].id,
            label: <Space><Avatar src={friendList[i].avatar}/> <span>{friendList[i].nickname}</span></Space>,
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
