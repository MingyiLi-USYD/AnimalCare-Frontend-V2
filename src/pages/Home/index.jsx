import {LikeOutlined, MessageOutlined, StarOutlined,HeartOutlined} from '@ant-design/icons';
import {Avatar, Card, Col, Divider, List, Row, Skeleton, Space} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {cancelLove, getPosts, love} from '../../services/postService';
import {getLovedPosts} from '../../services/userService';
import {parseStringToList, removeItem} from '../../utils/arrayUtils';
import {getImageList} from '../../utils/imageUtils';
import ImageList from "./Components/ImageList";
import {history} from 'umi';
import MySelector from "./Components/MySelector";
import InfiniteScroll from 'react-infinite-scroll-component';
import MyModal from "../Comment/MyModal";
import "./index.less"
import PostCard from "../Profile/Components/PostCard";

const IconText = ({ icon, text }) => (
    <Space>
        {icon}
        {text}
    </Space>
);

const HomePage = () => {
    const [loveList, setLoveList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [open, setOpen] = useState(false);
    const [postId, setPostId] = useState(0);
    const [page,setPage]=useState(0)
    const [total,setTotal] = useState(0)
    const [loading, setLoading] = useState(false);
    const [selector,setSelector] = useState(0);

    const handleLove = async (postId, index) => {
        if (loveList.includes(postId)) {
            const res = await cancelLove(postId);
            if (res.code === 1) {
                const newLoveList = removeItem(loveList, postId);
                setLoveList(newLoveList);
                let newPostList = [...postList];
                newPostList[index].love--;
                setPostList(newPostList);
            } else {
                console.log('异常');
            }
        } else {
            const res = await love(postId);
            if (res.code === 1) {
                setLoveList([...loveList, postId]);
                let newPostList = [...postList];
                newPostList[index].love++;
                setPostList(newPostList);
            } else {
                console.log('异常');
            }
        }
    };
    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);

        const {
            data: { records,total },
        } = await getPosts(`/api/post?currPage=${page+1}&pageSize=11&order=${selector}`);
        setPage(page+1)
        setPostList([...postList,...records]);
        setTotal(total)
        setLoading(false);
    };
    const fetchLovedPosts = async ()=>{
        const res = await getLovedPosts();
        setLoveList(parseStringToList(res.data));
    }

    useEffect(() => {
        fetchLovedPosts()
        loadMoreData()
    }, [selector]);

    if (postList === [] || loveList === []) {
        return <div>loading</div>;
    }

    return (
        <div >

            <MySelector selector={selector} setSelector={setSelector} setter={{setPostList,setPage,setTotal}}/>
            <div
                id="scrollableDiv"
                style={{
                    height: 800,
                    overflow: 'auto',
                    padding: '0 8x',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    borderRadius:20,

                }}
            >
                <InfiniteScroll
                    dataLength={postList.length}
                    next={loadMoreData}
                    hasMore={postList.length < total}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >

                    <div className={"list-container"}>
                        {
                            postList.map((item,index)=><div  key={index} className={"list-item"}>
                                <div className={"pic"}> <img src={`https://source.unsplash.com/random/${index}`} onClick={()=>{history.push(`/post/${item.postId}`)}}/></div>
                                <div className={"item-description"}>{item.postContent}</div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <div className={"item-userinfo"}>
                                        <Avatar size={28} src={`https://source.unsplash.com/random/${index}`}/>
                                        <span className={"nickname"}>{item.nickName}</span>
                                    </div>
                                    <div className={"operation"}>
                                        <HeartOutlined onClick={() => {handleLove(item.postId, index);}}
                                        style={loveList.includes(item.postId) ? { color: 'red' } : {}}/>
                                        <span className={"loves"}>{item.love}</span>
                                    </div>
                                </div>
                            </div>)
                        }

                    </div>
                </InfiniteScroll>
            </div>
            {open && (
                <MyModal
                    open={open}
                    close={() => {
                        setOpen(false);
                    }}
                    postId={postId}
                />
            )}


        </div>
    );
};

export default HomePage;
