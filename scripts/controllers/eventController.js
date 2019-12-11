import { getTemplate, isLoggedInfo, displaySuccess, displayError } from "../shared.js";
import * as eventService from "../services/eventService.js";
import { getData } from "../storage.js";

export function getCreate(ctx){
    let isLoggedCtx = isLoggedInfo(ctx);
    getTemplate("events/create.hbs", isLoggedCtx);
}

export function postCreate(ctx) {
    let data = {
        ...ctx.params,
        peopleInterestedIn:0,
        organizer:JSON.parse(getData("userInfo")).username,
    }
    eventService.createEvent(data)
     .then(ctx.redirect("#/home"))
     .then(displaySuccess("Event created succesfully!"))
     .catch(console.error);
};

export function getEventsHolder(ctx){
    getTemplate("events/eventsholder.hbs", ctx);
}

export async function getEventDetails(ctx){
    let isLoggedCtx = isLoggedInfo(ctx);
    let event = await eventService.getEventById(ctx.params.id);
    Object.keys(event).forEach(key=>{
        isLoggedCtx[key] = event[key];
    });
    isLoggedCtx.isOrganizer = isLoggedCtx.username === event.organizer;
    getTemplate("events/details.hbs", isLoggedCtx);
}

export async function getEventEdit(ctx){
    let isLoggedCtx = isLoggedInfo(ctx);
    let event = await eventService.getEventById(ctx.params.id);
    Object.keys(event).forEach(key=>{
        isLoggedCtx[key] = event[key];
    });
    console.log(isLoggedCtx)
    getTemplate("events/edit.hbs", isLoggedCtx);
}

export async function postEventEdit(ctx){
    let isLoggedCtx = isLoggedInfo(ctx);
    //let event = await eventService.getEventById(ctx.params.id);
    let data = {
        ...ctx.params,
    }
    delete data.id;
    eventService.editEvent(ctx.params.id, data)
    .then(isLoggedCtx.redirect(`#/details/${ctx.params.id}`))
    .then(displaySuccess("Event edited succesfully!"))
}

export function getEventClose(ctx){
    let isLoggedCtx = isLoggedInfo(ctx);
    eventService.deleteEvent(ctx.params.id)
    .then(isLoggedCtx.redirect(`#/home`))
    .then(displaySuccess("Event deleted succesfully!"));
}

export async function getEventJoin(ctx){
    let isLoggedCtx = isLoggedInfo(ctx);
    let event = await eventService.getEventById(ctx.params.id);
    event.peopleInterestedIn++;
    Object.keys(event).forEach(key=>{
        isLoggedCtx[key] = event[key];
    });
    eventService.editEvent(ctx.params.id, event)
    .then(isLoggedCtx.redirect(`#/details/${ctx.params.id}`))
    .then(displaySuccess("You joined event succesfully!"));
}