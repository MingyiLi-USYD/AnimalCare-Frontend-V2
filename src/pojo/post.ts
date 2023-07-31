import {PostImage} from "@/pojo/postImage";
import {User} from "@/pojo/user";
import {Comment} from "@/pojo/comment";

export type Post = {
    postId: number;
    userId: number;
    love: number;
    postContent: string;
    postTag: string;
    postTitle: string;
    postTime: number;
    publishTime: number;
    visible: boolean;
    viewCount: number;
};
export type PostDto = Post & {
    images: PostImage[];
    commentList?: Comment[];
    postUser: User;
};
