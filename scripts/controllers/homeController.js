import { getTemplate, isLoggedInfo } from '../shared.js'
import * as eventService from '../services/eventService.js';

export async function getHome(ctx) {
    let isLoggedCtx = isLoggedInfo(ctx);
    let events = await eventService.getAllEvents();
    isLoggedCtx.events = events;
    getTemplate("home.hbs", isLoggedCtx);
};




