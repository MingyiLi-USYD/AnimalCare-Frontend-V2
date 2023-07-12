type User ={
     id: number;
     avatar: string;
     nickname: string;
     description: string;
}

type ResponseMessage<T> ={
     code: number;
     message: T;
     fromUser: User;
}

