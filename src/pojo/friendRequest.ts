import {User} from "@/pojo/user";

export type FriendRequest = {
    requestId: number;
    myId: number;
    friendId: number;
    msg: string;
};

export type FriendRequestDto = FriendRequest & {
    // Add any additional fields or methods if needed
    friendInfo:User;
};