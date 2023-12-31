import {Divider, Skeleton,Input } from 'antd';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'umi';
import MySelector from "./Components/MySelector";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./home.less"
import PostCard from "@/components/Cards/postCard";
const { Search } = Input;
const HomePage = () => {
    const {postList, pages, total, selector, current,keywords} = useSelector(state => state.homeModel)
    const dispatch = useDispatch();


    const initData = () => {
        dispatch({
            type: 'homeModel/fetchPosts',
            payload: {
                selector,
                keywords
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
            initData()
    }, [selector,keywords]);

    const handleSearch =(value)=>{
        dispatch({
            type: 'homeModel/changeKeywords',
            payload: value
        })
    }

    return (
        <div className={'home-page'}>
            <Search defaultValue={keywords} placeholder="Input Search Text" enterButton="Search" size="large" onSearch={handleSearch} />
            <MySelector/>
            <div
                id="scrollableDiv"
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
