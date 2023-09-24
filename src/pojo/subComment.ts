import {User} from "@/pojo/user";

export interface Subcomment {
    subcommentId: number;
    commentId: number;
    userId: number;
    targetUserId: number;
    subcommentTime: number;
    subcommentContent: string;
    subcommentLove: number;
    isReply: boolean;
    replyUserId: number;

}

export interface SubcommentDto extends Subcomment {

    subcommentUser: User;
    replyUser: User;
}