import { appKey } from "../storage.js";
import { get, post, put, del } from "../requester.js";

export function createEvent(ctx){
    return post(`appdata/${appKey}/events`, ctx);
}

export async function getAllEvents(){
    return await get(`appdata/${appKey}/events`);
}

export async function getEventById(id){
    return await get(`appdata/${appKey}/events/${id}`);
}

export async function editEvent(id, data){
    return await put(`appdata/${appKey}/events/${id}`, data);
}

export async function deleteEvent(id){
    return await del(`appdata/${appKey}/events/${id}`);
}

export async function joinEvent(id, data){
    return await put(`appdata/${appKey}/events/${id}`, data);
}
