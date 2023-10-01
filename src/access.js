import {history} from "umi";

export default function accessFactory(initialState) {
    //antdProlayout 好像跟这个原生的Access 不是很适配 只能用高阶组件拦截了
    if(history.location.pathname==='/login'){
        return {

        }
    }
    const { currentUser:{role} } = initialState;
    const rightMap= {
        User:0,
        Admin:1,
        SuperAdmin:2,
        Root:3
    }
  const  hasPermission=(value)=>rightMap[role]?rightMap[role]>rightMap[value]:false

    return {
        hasPermission,
        thanUser:hasPermission("User"),
        thanAdmin:hasPermission("Admin"),
        thanSuperAdmin:hasPermission("SuperAdmin")
    };
}