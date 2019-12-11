import { saveUser, getData } from "./storage.js";

export function getTemplate(path, ctx){
    ctx.loadPartials({
        header:'./views/header.hbs',
        footer:'./views/footer.hbs',
        eventsHolder:'./views/events/eventsHolder.hbs',
        error:'./views/events/error.hbs',
    })
    .then(function(){
        this.partial(`./views/${path}`);
    });

}

export function saveAndRedirect(ctx, path, data){
    saveUser(data);
    ctx.redirect(path);
}

export function isLoggedInfo(ctx){
    if (getData("userInfo") !==null) {
        ctx.isLogged = true;
        ctx.username = JSON.parse(getData("userInfo")).username;
    }
    return ctx;
}

export function displayError(message){
    const errorBox = document.getElementById("errorBox");
    errorBox.style.display = 'block';
    errorBox.textContent = message;
    setTimeout(()=>{
        errorBox.style.display = 'none';
    }, 2000);
}

export function displaySuccess(message){
    const successBox = document.getElementById("successBox");
    successBox.style.display = 'block';
    successBox.textContent = message;
    setTimeout(()=>{
        successBox.style.display = 'none';
    }, 2000);
}