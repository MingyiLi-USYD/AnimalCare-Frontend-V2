import {User} from "@/pojo/user";

type ResponseMessage<T> ={
     code: number;
     message: T;
     fromUser: User;
}

