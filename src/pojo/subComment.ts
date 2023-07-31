import {User} from "@/pojo/user";

export interface Subcomment {
    subcommentId: number;
    commentId: number;
    userId: number;
    subcommentTime: number;
    subcommentContent: string;
    subcommentLove: number;
    targetNickname?: string; // The "?" makes this property optional
}

export interface SubcommentDto extends Subcomment {
    // Include properties from the Subcomment class
    // For example:
    subcommentId: number;
    commentId: number;
    userId: number;
    subcommentTime: number;
    subcommentContent: string;
    subcommentLove: number;

    // Additional properties for SubcommentDto
    subcommentUser: User;
}