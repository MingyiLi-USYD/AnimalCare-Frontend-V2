import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton} from 'antd';
import CommentPostCard from "./commentPostCard";
import {getAllCommentsToMyPost} from "@/services/commentService";
import usePage from "@/hooks/usePage";

const App = () => {

    const {data,loading,total,loadMoreData} = usePage(getAllCommentsToMyPost,3);

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
                            <CommentPostCard data={item}/>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>

    );
};
export default App;