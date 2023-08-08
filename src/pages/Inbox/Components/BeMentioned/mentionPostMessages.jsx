import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Divider, List, Skeleton} from 'antd';
import usePage from "@/hooks/usePage";
import MentionPostCard from "@/pages/Inbox/Components/BeMentioned/mentionPostCard";
import {getAllMentions} from "@/services/mentionService";
const MentionPostMessages = () => {
    const {total,data,loading,loadMoreData} = usePage(getAllMentions,3);
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
                         <MentionPostCard data={item}/>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>

    );
};
export default MentionPostMessages;