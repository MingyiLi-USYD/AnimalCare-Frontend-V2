import {Action, AnyAction} from "umi";

export type MyReducer<S = any, A extends Action = AnyAction> = (prevState: S, action: A) => S | void;

export interface MyReducersMapObject<T,S extends Action> {
    [key: string]: MyReducer<T,S>,
}

export interface MyAction<T> extends Action{
    payload:T
}
export interface Page<T>{
    records:T[]
    total:number,
    size:number,
    current:number,
    pages:number,
}