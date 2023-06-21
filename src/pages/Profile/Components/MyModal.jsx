import {Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import {getCommentsById} from "../../../services/commentService";
import Comment from "../../Comment/Comment";

const MyModal = ({postId,open,close}) => {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);

    const loadMoreData =  () => {
        console.log("调用一次")
        if (loading) {
            return;
        }
        setLoading(true);
        getCommentsById(postId,page+1,3).then(res=>{
            const {
                data: { records,total },
            }=res;
            setPage(page+1)
            setCommentList([...commentList,...records]);
            setTotal(total)
            setLoading(false);
        })

    };
    useEffect(() => {
        loadMoreData()
    }, []);
    const handleOk = () => {
        close();
    };
    const handleCancel = () => {
        close();
    };
    return (

            <Modal
                footer={[]}
                title="Comments"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
            >

              <Comment/>
           </Modal>

    );
};
export default MyModal;

