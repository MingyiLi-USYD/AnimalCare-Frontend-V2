import {HeartOutlined} from '@ant-design/icons';
import {Avatar, Divider, Skeleton, Space} from 'antd';
import {useEffect, useState} from 'react';
import {cancelLove, getPosts, love} from '../../services/postService';
import {getLovedPosts} from '../../services/userService';
import {parseStringToList, removeItem} from '../../utils/arrayUtils';
import {history} from 'umi';
import MySelector from "./Components/MySelector";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./index.less"
import {useDispatch, useSelector} from "../../.umi/exports";

const HomePage = () => {
    const [postList, setPostList] = useState([]);
    const [page,setPage]=useState(0)
    const [total,setTotal] = useState(0)
    const [loading, setLoading] = useState(false);
    const [selector,setSelector] = useState(0);
    const {loveList,startList} = useSelector(state=>state.userModel)
    const dispatch = useDispatch();
    const handleLove = async (postId, index) => {
         dispatch({
             type:'userModel/addToLoveList',
             payload:postId
         })


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

    useEffect(() => {
        loadMoreData()
    }, [selector]);

    if (postList === []) {
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



        </div>
    );
};

export default HomePage;
