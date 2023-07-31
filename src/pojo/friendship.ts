import {User} from "@/pojo/user";

export type Friendship = {
    friendshipId: number;
    myId: number;
    friendId: number;
};

export type FriendshipDto = Friendship & {
    friendInfo:User;
};
