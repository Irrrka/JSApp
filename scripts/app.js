import * as homeController from './controllers/homeController.js'
import * as userController from './controllers/userController.js'
import * as eventController from './controllers/eventController.js'

(()=>{
    const app = Sammy('body', function(){
        this.use('Handlebars', 'hbs');

        this.get('#/home', homeController.getHome);

        this.get('#/register', userController.getRegister);
        this.post('#/register', userController.postRegister);

        this.get('#/login', userController.getLogin);
        this.post('#/login', userController.postLogin);
        
        this.get('#/profile', userController.getProfile);

        this.get('#/logout', userController.getLogout);

        this.get('#/create', eventController.getCreate);
        this.post('#/create', eventController.postCreate);

        this.get('#/details/:id', eventController.getEventDetails);

        this.get('#/edit/:id', eventController.getEventEdit);
        this.post('#/edit/:id', eventController.postEventEdit);
            
        this.get('#/close/:id', eventController.getEventClose);
        this.get('#/join/:id', eventController.getEventJoin);
    });
    app.run();
})()