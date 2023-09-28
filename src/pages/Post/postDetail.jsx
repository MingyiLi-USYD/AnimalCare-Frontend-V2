import React, {useEffect, useRef, useState} from 'react';
import {history, useDispatch, useParams, useSelector} from "umi";
import "./postDetail.less"
import {Avatar, Button, Carousel, Divider, Input, List, Mentions, Skeleton} from "antd";
import Loading from "../../components/Loading";
import {HeartOutlined, MessageOutlined, PaperClipOutlined, SmileOutlined, StarOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Comment/comment";
import Interaction from "../../components/Interactions/interaction";
import {
    addCommentAction,
    addSubcommentAction,
    cancelLoveAction,
    fetchCommentAction,
    fetchPostAction,
    fetchPostWithComments,
    loveAction,
    showCommentsAction,
    subscribeUserAction,
    unsubscribeUserAction
} from "@/actions/postDetailActions";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import BackForward from "@/components/BackForward";
import {urlWrapper} from "@/utils/imageUtils";


function PostDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const {postId} = params
    const commentContainerRef = useRef(null)
    const inputRef = useRef(null);
    const [active, setActive] = useState(false)
    const [text, setText] = useState('')
    const [emo, setEmo] = useState(false)

    const {
        post,
        total,
        pages,
        comments,
        label,
        type,
        commentId,
        isReply,
        replyUserId,
    } = useSelector(state => state.postDetailModel)
    const {loveList, startList,subscribeList} = useSelector(state => state.userModel)
    const {friendList} = useSelector(state => state.friendModel)
    const {effects, global} = useSelector(state => state.loading)
    const mapFriendList = (friend)=>{
        const {friendInfo:{userId,nickname}} = friend;
        return {
            label:nickname,
            value:nickname,
            key:userId,
        }
    }
    const options= friendList.map(mapFriendList)
    useEffect(() => {
        if (postId && postId !== post.postId) {
            dispatch(fetchPostAction(postId))
        }
    }, [])
    useEffect(() => {
        if (active && text.length === 0) {
            setActive(false)
        }
        if (!active && text.length > 0) {
            setActive(true)
        }
    }, [text])

    const loadComment = () => {
        dispatch(fetchCommentAction(postId, pages, 10))
    }


    const handleInput = (newValue) => {
        setText(newValue);
    }

    const showComments = () => {
        const commentContainer = commentContainerRef.current;
        if (commentContainer) {
            const commentContainerTop = commentContainer.getBoundingClientRect().top;
            dispatch(showCommentsAction())
            if (commentContainerTop > 0) {
                commentContainer.scrollIntoView({behavior: 'smooth'});
            }
        }
    }

    console.log(effects[fetchPostWithComments])


    if (effects[fetchPostWithComments]) {
        return <Loading/>
    }

    const handleLove = () => {
        dispatch(loveAction(postId))
    };
    const handleCancelLove = () => {
        dispatch(cancelLoveAction(postId))
    };

    const handleSend = () => {
        if (type === 0) {
            dispatch(addCommentAction(postId, text, post.userId))
        }
        if (type === 1) {
            dispatch(addSubcommentAction(commentId, text, post.userId))
        }
        if (type === 2) {
            dispatch(addSubcommentAction(commentId, text, post.userId, replyUserId,isReply))
        }
        afterSend()
    }

    const afterSend = () => {
        setText("")
    }
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleSubscribe = () => {
        dispatch(subscribeUserAction(post.userId))
    }
    const handleUnsubscribe = () => {
        dispatch(unsubscribeUserAction(post.userId))
    }
    const appendText = (data) => {
        setText(text + data.native)
        setEmo(false)
        handleFocus()
    }

    return (


        <div className={"post-container"}>
            <BackForward/>
            <div className={"carousel"}>
                <Carousel autoplay={false}>
                    {post?.images?.map(({imageId, imageUrl}) =>
                        (
                            <div key={imageId}>
                                <div className={"image-container"}
                                 style={{backgroundSize: "contain", backgroundImage: `url(${urlWrapper(imageUrl)})`}}
                                />
                            </div>
                        )
                    )}
                </Carousel>
            </div>
            <div className={"content-info"}>
                <div className={"author-info"}>
                    <div className={"user-info"}>
                        <Avatar className={"avatar"} size={40} src={post?.postUser?.avatar} onClick={() => {
                            history.push(`/profile/${post?.userId}`)
                        }}/>
                        <span className={"nickname"}>{post?.postUser?.nickname}</span>
                    </div>
                    {
                        subscribeList.includes(post?.userId) ?
                            <Button style={{borderRadius: 20}} danger onClick={handleUnsubscribe}>Unsubscribe</Button>
                            : <Button style={{borderRadius: 20}} type={"primary"}
                                      onClick={handleSubscribe}>Subscribe</Button>
                    }
                </div>
                <div className={"note-scroller"} id="scrollableDiv">
                    <div className={"note-content"}>
                        <div className={"topic"}>
                            {
                                post.postTitle
                            }
                        </div>
                        <div className={"description"}>
                            {
                                post.postContent
                            }
                        </div>
                    </div>
                    <div className={"comment-container"} ref={commentContainerRef}>
                        <div className={"total"}>
                            {`Totally ${total} comments`}
                        </div>
                        <div className={"comment-list"}>
                            <InfiniteScroll
                                dataLength={comments.length}
                                next={loadComment}
                                hasMore={comments.length < total}
                                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={comments}
                                    renderItem={(item) => (
                                        <Comment key={item.commentId} comment={item} focus={handleFocus}/>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                {
                    emo && <Picker onClickOutside={() => setEmo(false)} data={data} onEmojiSelect={appendText}/>
                }


                <div className={"actions"}>

                    {
                        loveList.includes(postId) ?
                            <Interaction number={post.love} active={true}>
                                <HeartOutlined className={"my-icon"} onClick={handleCancelLove}/>
                            </Interaction> :
                            <Interaction number={post.love}>
                                <HeartOutlined className={"my-icon"} onClick={handleLove}/>
                            </Interaction>
                    }
                    <Interaction number={post.love}>
                        <StarOutlined className={"my-icon"}/>
                    </Interaction>
                    <Interaction number={total}>
                        <MessageOutlined className={"my-icon"} onClick={showComments}/>
                    </Interaction>
                </div>
                <div className={"bottom"}>

                    <div className={"comment-wrapper"}>
                        <Mentions placeholder={label} value={text} onChange={handleInput} ref={inputRef} options={options}/>
                        <div className={`input-buttons ${active ? 'active' : 'inactive'}`}>
                            <PaperClipOutlined onClick={() => {
                            }}/>
                            <SmileOutlined onClick={(e) => {
                                e.stopPropagation();
                                setEmo(true)
                            }}/>
                            <Button size={"middle"} type={"primary"} onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default PostDetail;