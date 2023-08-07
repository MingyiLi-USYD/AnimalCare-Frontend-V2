import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton} from 'antd';
import LovePostCard from "./lovePostCard";
import {getAllLovesToMyPost} from "@/services/postService";
import usePage from "@/hooks/usePage";
import CommentPostCard from "@/pages/Inbox/Components/Comments/commentPostCard";

const App = () => {
    const {data, loading, total, loadMoreData} = usePage(getAllLovesToMyPost, 3);

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
                              <LovePostCard data={item}/>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>

    );
};
export default App;