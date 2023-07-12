

 type ChatMessage = {
     fromId: string;
     date: number;
     toId: string;
    content: string;


}

type ServiceMessage ={
    fromId: string;
    date: number;
    toId: string;
    type: number; // 1: add friend, 2: reject friend, 3: friend online, 4: friend offline

}
