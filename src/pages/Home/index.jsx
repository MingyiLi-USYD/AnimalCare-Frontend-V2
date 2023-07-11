import {HeartOutlined} from '@ant-design/icons';
import {Avatar, Divider, Skeleton} from 'antd';
import {useEffect} from 'react';
import {history, useModel} from 'umi';
import MySelector from "./Components/MySelector";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./index.less"
import {useDispatch, useSelector} from "umi";
import Interaction from "../../components/Interactions/interaction";

const HomePage = () => {
    const {loveList, startList} = useSelector(state => state.userModel)
    const {postList,pages,total,selector,current} = useSelector(state => state.homeModel)
    const dispatch = useDispatch();
    const handleLove = (postId) => {
        dispatch({
            type: 'homeModel/lovePost',
            payload: postId
        })
    };
    const handleCancelLove = (postId) => {
        dispatch({
            type: 'homeModel/cancelLovePost',
            payload: postId
        })
    };

    const initData =  () => {
           dispatch({
               type: 'homeModel/fetchPosts',
               payload: {
                   current,
                   selector
               }
           })
    };

    const loadMoreData =  () => {
        dispatch({
            type: 'homeModel/loadMorePosts',
            payload: {
                current,
                selector
            }
        })
    };

    useEffect(() => {
        if(postList.length===0){
            initData()
        }
    }, []);

    return (
        <div>

            <MySelector />
            <div
                id="scrollableDiv"
                style={{
                    height: 800,
                    overflow: 'auto',
                    padding: '0 8x',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    borderRadius: 20,

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
                            postList.map((item, index) => <div key={index} className={"list-item"}>
                                <div className={"pic"}><img src={`https://source.unsplash.com/random/${index}`}
                                                            onClick={() => {
                                                                history.push(`/post/${item.postId}`)
                                                            }}/></div>
                                <div className={"item-description"}>{item.postContent}</div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div className={"item-userinfo"}>
                                        <Avatar size={28} src={`https://source.unsplash.com/random/${index}`} onClick={()=>{
                                            history.push(`/profile/${item.userId}`)
                                        }}/>
                                        <span className={"nickname"}>{item.nickName}</span>
                                    </div>
                                    <div className={"operation"}>
                                        {
                                            loveList.includes(item.postId) ?
                                                <Interaction number={item.love} active={true}>
                                                    <HeartOutlined onClick={() => {
                                                        handleCancelLove(item.postId);
                                                    }}/>
                                                </Interaction>
                                                :
                                                <Interaction number={item.love}>
                                                    <HeartOutlined onClick={() => {
                                                        handleLove(item.postId,);
                                                    }}/>
                                                </Interaction>
                                        }

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
