import {User} from "@/pojo/user";

export interface FriendRequest  {
    requestId: number;
    myId: number;
    friendId: number;
    msg: string;
}

export interface FriendRequestDto extends FriendRequest{
    friendInfo:User;
}