import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton} from 'antd';
import {getAllPostsMentionToMe} from "@/services/postService";
import usePage from "@/hooks/usePage";

const MentionPostMessages = () => {
    const {total,data,loading,loadMoreData} = usePage(getAllPostsMentionToMe,3);
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
                            <div style={{backgroundColor: "blue", height: 300, width: 400}}>111</div>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>

    );
};
export default MentionPostMessages;