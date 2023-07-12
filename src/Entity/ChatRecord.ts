interface ChatRecordItem {
    chatList: ChatMessage[];
    chatUser: User;
    latestTime: number;
    latestMsg: string;
    unRead: number;
}

type ChatRecord = {
    [userId: string]: ChatRecordItem;
};