import {User} from "@/pojo/user";

export interface Friendship  {
    friendshipId: number;
    myId: number;
    friendId: number;
};

export interface FriendshipDto extends Friendship  {
    friendInfo:User;
}
