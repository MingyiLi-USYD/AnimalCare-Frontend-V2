import {Post} from "@/pojo/post";
import {Pet} from "@/pojo/pet";
import {FriendshipDto} from "@/pojo/friendship";
import {FriendRequestDto} from "@/pojo/friendRequest";

export interface User  {
    userId: number;
    uuid: string;
    username: string;
    password: string;
    role: string;
    email: string;
    nickname: string;
    description: string;
    avatar: string;
    avatarFile: string;
    tag: string;
}

export interface UserDto extends User  {
    postList: Post[];
    petList: Pet[];
    loveList: Post[];
    friendshipDtoList: FriendshipDto[];
    friendRequestDtoList: FriendRequestDto[];
}