import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton} from 'antd';
import LovePostCard from "./lovePostCard";
import usePage from "@/hooks/usePage";
import {getLovePostsToMe} from "@/services/lovePostService";

const App = () => {
    const {data, loading, total, loadMoreData,setData} = usePage(getLovePostsToMe, 3);
    const handleRemoveFromState = (loveId) => {
        setData(data.filter(lovePost => lovePost.loveId !== loveId))
    }
    return (
        <div className={'post-relevant-messages'}>
            <div
                id="scrollableDiv"
                className={'scroll-list'}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < total}
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
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <LovePostCard data={item} removeLovePost={handleRemoveFromState}/>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>

    );
};
export default App;