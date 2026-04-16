import { UserRoles } from "./UserRoles";

export interface UserDetails{
    id:number,
    uid:string,
    username:string,
    email:string,
    roles:UserRoles[],
    accountExpired:boolean,
    accountNonLocked:boolean,
    credentialsExpired:boolean,
    active:boolean
}