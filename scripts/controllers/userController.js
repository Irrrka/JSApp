import * as shared from '../shared.js'
import { get, post, put, del } from '../requester.js'
import { getData, saveUser, removeUser } from '../storage.js'
import * as userService from '../services/userService.js'
import * as eventService from '../services/eventService.js';

export function getRegister(ctx) {
    shared.getTemplate("user/register.hbs", ctx);
};

export function postRegister(ctx) {
    const { username, password, rePassword } = ctx.params;
    if (!username || !password || password !== rePassword) {
        alert("hmm, something is wrong with your data!");
        throw new Error("Username ot Password is null or Paswords do not match!");
    }
    userService.register(username, password)
    .then(shared.saveAndRedirect.bind(undefined, ctx, "#/home"))
    .then(shared.displaySuccess("You registered successfully!"))
    .catch(console.error);
};

export function getLogin(ctx) {
    shared.getTemplate("user/login.hbs", ctx);
};

export function postLogin(ctx) {
    const { username, password } = ctx.params;
   
    userService.login(username, password)
    .then(shared.saveAndRedirect.bind(undefined, ctx, "#/home"))
    .then(shared.displaySuccess("You logged in successfully!"))
    .catch(console.error);
};

export async function getProfile(ctx) {
    let isLoggedCtx = shared.isLoggedInfo(ctx);
    try {
        let events = await eventService.getAllEvents();
        let myEvents = events.filter(e=>e.organizer===isLoggedCtx.username);
        isLoggedCtx.events = myEvents;
        isLoggedCtx.numOfEvents = myEvents.lenght;
            
    } catch (e) {
        console.log(e);    
    }
    shared.getTemplate("user/profile.hbs", isLoggedCtx);
};


export function getLogout(ctx) {
    userService.logout()
    .then(() => {
        removeUser();
        shared.displaySuccess("You logged out successfully!")
        ctx.redirect("#/home");
    })
    .catch(console.error);
};
