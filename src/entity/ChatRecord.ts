import {User} from "@/pojo/user";

export type ChatRecordItem ={
    chatList: ChatMessage[];
    chatUser: User;
    latestTime: number;
    latestMsg: string;
    unRead: number;
}

export type ChatRecord = {
    [userId: string]: ChatRecordItem;
};