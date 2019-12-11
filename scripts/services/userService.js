import { get, post, put, del } from '../requester.js'
import { appKey } from '../storage.js'

export function register(username, password){
    return post(`user/${appKey}/`, {username, password});
}

export function login(username, password){
    return post(`user/${appKey}/login`, {username, password});
}

export function logout(){
    return post(`user/${appKey}/_logout`);
}