import {User} from "@/pojo/user";
import {ChatMessage} from "@/entity/Message";

export interface ChatRecordItem {
    chatList: ChatMessage[];
    chatUser: User;
    latestTime: number;
    latestMsg: string;
    unRead: number;
}

export interface ChatRecord  {
    [userId: string]: ChatRecordItem;
}