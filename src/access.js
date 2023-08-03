
export default function accessFactory(initialState) {
    const { currentUser:{role} } = initialState;
    console.log(role)
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