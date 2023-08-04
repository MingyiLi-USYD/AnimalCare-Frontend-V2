import {history} from "umi";

export default function accessFactory(initialState) {

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
        isRoot: false,
        hasPermission,
        thanUser:hasPermission("User"),
        thanAdmin:hasPermission("Admin"),
        thanSuperAdmin:hasPermission("SuperAdmin")
    };
}