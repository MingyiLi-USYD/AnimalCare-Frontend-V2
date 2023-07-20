import {Divider, Skeleton} from 'antd';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'umi';
import MySelector from "./Components/MySelector";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./index.less"
import PostCard from "@/components/Cards/postCard";

const HomePage = () => {
    const {postList, pages, total, selector, current} = useSelector(state => state.homeModel)
    const dispatch = useDispatch();


    const initData = () => {
        dispatch({
            type: 'homeModel/fetchPosts',
            payload: {
                current,
                selector
            }
        })
    };

    const loadMoreData = () => {
        dispatch({
            type: 'homeModel/loadMorePosts',
            payload: {
                current,
                selector
            }
        })
    };

    useEffect(() => {
        if (postList.length === 0) {
            initData()
        }
    }, []);

    return (
        <div>

            <MySelector/>
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
                            postList.map((item, index) => <PostCard item={item} key={item.postId} index={index}/>)
                        }

                    </div>
                </InfiniteScroll>
            </div>


        </div>
    );
};

export default HomePage;
