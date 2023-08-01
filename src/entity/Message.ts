import {User} from "@/pojo/user";

export interface RequestMessage {
    fromId: string;
    date: number;
    toId: string;
}

export  interface ChatMessage extends  RequestMessage{
    content: string;
}

export interface ServiceMessage extends  RequestMessage{
    type: number; // 1: add friend, 2: reject friend, 3: friend online, 4: friend offline
}
export interface SystemMessage extends RequestMessage {
    fromServer: string;
}

 export interface CloudMessage {
     id: string;
     latestTime: number;
     participates: string[];
     chatList: ChatMessage[];
     chatUser: User;
     unRead: number;
 }