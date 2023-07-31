import {User} from "@/pojo/user";
import {SubcommentDto} from "@/pojo/subComment";

export interface Comment  {
    commentId: number;
    postId: number;
    userId: number;
    commentTime: number;
    commentContent: string;
    commentLove: number;
}
export interface CommentDto extends Comment {
    // Additional properties for CommentDto
    commentUser: User;
    subcommentDtos: SubcommentDto[];
    subcommentsLength: number;
}