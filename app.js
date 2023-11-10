"use strict"

// --- Importar módulos ---
// Core
const path = require("path");

// Paquete
const express = require("express");
const mySQL = require("mysql");
const session = require("express-session");
const mySQLsession = require("express-mysql-session");
const morgan = require("morgan");

// Fichero
const mySQLconfig = require("./config");
const responseHandler = require("./responseHandler");
const DAODestinations = require("./dao/DAODestinations");
const DAOReservations = require("./dao/DAOReservations");
const DAOUsers = require("./dao/DAOUsers");
const ASDestinations = require("./as/ASDestinations");
const ASReservations = require("./as/ASReservations");
const ASUsers = require("./as/ASUsers");

// --- Crear aplicación Express ---
const app = express();

// --- EJS ---
app.set("view engine", "ejs"); // Configurar EJS como motor de plantillas
app.set("views", path.join(__dirname, "views")); // Definir el directorio de plantillas

// --- BodyParser (Express) ---
app.use(express.urlencoded({extended: true}));

// --- Static ---
app.use(express.static(path.join(__dirname, "public"))); // Gestionar ficheros estáticos con static

// --- Morgan ---
app.use(morgan("dev")); // Imprimir peticiones recibidas

// --- Sesiones y MySQL ---
// Sesión MySQL
const mySQLStore = mySQLsession(session);
const sessionStore = new mySQLStore(mySQLconfig.config);

// Crear middleware de la sesión
const middlewareSession = session({
    saveUninitialized: false,
    secret: "sunera1806",
    resave: true,
    store: sessionStore
});
app.use(middlewareSession);

// Crear pool de conexiones
const pool = mySQL.createPool(mySQLconfig.config);

// --- DAOs y ASs ---
// Crear instancias de los DAOs
const DAODes = new DAODestinations(pool);
const DAORes = new DAOReservations(pool);
const DAOUse = new DAOUsers(pool);
// Crear instancias de los ASs
const ASDes = new ASDestinations(DAODes);
const ASRes = new ASReservations(DAORes, DAOUse, DAODes);
const ASUse = new ASUsers(DAOUse);

// --- VARIABLES GLOBALES de plantilla ---
app.locals.tlfApp = "+34 XXX XXX XXX" // Teléfono
app.locals.emailApp = "sunera@gmail.com" // Correo electrónico
app.locals.addressApp = "C/ Prof. José García Santesmases, 9" // Dirección
// Nuestras Redes Sociales
app.locals.rrssApp = [
    { name: "Instagram", username: "@sunera_viajes", logo: "instagram.png", link: "https://www.instagram.com/" },
    { name: "Twitter", username: "@sunera", logo: "twitter.png", link: "https://twitter.com/" },
    { name: "TikTok", username: "@sunera_viajes", logo: "tiktok.png", link: "https://www.tiktok.com/" },
    { name: "Facebook", username: "@SunEra", logo: "facebook.png", link: "https://www.facebook.com/" }];
// Preguntas frecuentes
app.locals.faqApp = [
    { question: "¿Con cuánta antelación hay que reservar?", answer: "A diferencia de otras compañías, no necesitarás reservar con varios meses de antelación. Basta con hacerlo el día anterior para poder disfrutar de alguna de nuestras experiencias inolvidables."},
    { question: "¿Cuánto hay que pagar?", answer: "En cada destino queda especificado el precio por persona a pagar. En el caso de que el precio sean 100€ y nuestro grupo sea de 3 personas, el importe total será de 300€."},
    { question: "¿Cobráis gastos de gestión?", answer: "Los gastos de gestión van incluidos en el precio, por lo que no te llevarás ningún susto a la hora de realizar el pago. Sólo tendrás que abonar la cantidad especificada sin ningún extra inesperado."},
    { question: "¿Se puede modificar una reservar?", answer: "No hay manera de modificar una reserva, por lo que una vez realizada solo podrás cancelarla y volver a hacerla con las modificaciones deseadas."},
    { question: "¿Se puede cancelar una reserva?", answer: "Sí, puedes cancelar tu reserva hasta el día anterior al inicio de tu viaje. Además, se efectuará el reembolso completo, por lo que no tienes que preocuparte por eventos imprevistos."},
    { question: "¿Qué incluye el seguro del viaje?", answer: "El seguro del viaje incluye la sanidad en caso de accidente en el destino, la pérdida o daño del equipaje y una compensación en caso de tener que ser cancelado por motivos ajenos."},
    { question: "¿Qué destino recomendáis?", answer: "Te invitamos a que te sientas libre de explorar nuestra web para encontrar aquellos destinos que más se ajusten a ti. Puedes hacerlo visitando nuestra página de inicio o de tendencias. En la de inicio podrás filtrar para encontrar los destinos que más se ajusten a tus necesidades, mientras que en tendencias podrás ver aquellos mejor valorados por nuestros usuarios."}];

// --- Middlewares ---
// Comprobar que el usuario ha iniciado sesión
function userLogged(request, response, next) {
    if (request.session.currentUser) {
        next();
    }
    else {
        response.redirect("/login");
    }
};

// --- Peticiones GET ---
// Index
app.get(["/", "/inicio"], userLogged, (request, response, next) => {
    ASDes.getAllDestinations((error, destinations) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            next(errorObj); // Redirigir a error.ejs
        }
        else {
            ASDes.getParams(destinations, (error, params) => {
                if (error) {
                    let errorObj = responseHandler.generateRes(error);
                    next(errorObj); // Redirigir a error.ejs
                }
                else {
                    response.status(200);
                    response.render("index", { destinations: destinations, params: params, filters: [], msg: undefined});
                }
            });
        }
    });
});

// Login
app.get("/login", (request, response, next) => {
    response.status(200);
    response.render("login", { msg: undefined });
});

// SignUp
app.get("/sign_up", (request, response, next) => {
    response.status(200);
    response.render("sign_up", { msg: undefined });
});

// Trending
app.get("/tendencias", userLogged, (request, response, next) => {
    ASDes.getAllDestinations((error, destinations) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            next(errorObj); // Redirigir a error.ejs
        }
        else {
            response.status(200);
            response.render("trending", { destinations: destinations });
        }
    });
});

// About Us
app.get("/quienes_somos", userLogged, (request, response, next) => {
    response.status(200);
    response.render("about_us");
});

// Contact
app.get("/contacto", userLogged, (request, response, next) => {
    response.status(200);
    response.render("contact");
});

// User
app.get("/perfil", userLogged, (request, response, next) => {
    ASUse.getUser(request.session.currentUser.id, (error, user) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            next(errorObj); // Redirigir a error.ejs
        }
        else {
            ASRes.getReservationsByUser(user.id, (error, currentReservations, oldReservations) => {
                if (error) {
                    let errorObj = responseHandler.generateRes(error);
                    next(errorObj); // Redirigir a error.ejs
                }
                else {
                    request.session.currentUser = user;
                    request.session.currentReservations = currentReservations;
                    request.session.oldReservations = oldReservations;
                    response.status(200);
                    response.render("user", { user: user, currentReservations: currentReservations, oldReservations: oldReservations, msg: undefined });
                }
            })
        }
    })
});

// Destination
app.get("/destino/:id", userLogged, (request, response, next) => {
    ASDes.getDestination(request.params.id, (error, destination) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            next(errorObj); // Redirigir a error.ejs
        }
        else {
            ASDes.getCommentsByDestination(destination.id, (error, comments) => {
                if (error) {
                    let errorObj = responseHandler.generateRes(error);
                    next(errorObj); // Redirigir a error.ejs
                }
                else {            
                    request.session.destination = destination;
                    request.session.comments = comments;       
                    response.status(200);
                    response.render("destination", { dest: destination, comments: comments, user: { username: request.session.currentUser.username }, msg: undefined});
                }
            })
        }
    })
});

// --- Peticiones POST ---
// Registro usuario
app.post("/sign_up", (request, response, next) => {
    let newUser = { name: request.body.name, 
                    username: request.body.username, 
                    email: request.body.email, 
                    password: request.body.password,
                    repeatPass: request.body.repeatPassword };
    
    ASUse.signUp(newUser, (error) =>{
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            if (error < 0) {
                next(errorObj); // Redirigir a error.ejs
            }
            else {
                response.render("sign_up", { msg: errorObj });
            }
        }
        else {
            let res = {
                cod: 0,
                title: "Registro completado",
                message: "Tu cuenta ha sido creada con éxito! Ya puedes logearte, bienvenido :)"
            }
            let msgObj = responseHandler.generateRes(res.cod, res.title, res.message);
            response.status(200);
            response.render("login", { msg: msgObj });
        }
    });
});

// Inicio de sesión
app.post("/login", (request, response, next) => {
    ASUse.login(request.body.username, request.body.password, (error, user) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            if (error < 0) {
                next(errorObj); // Redirigir a error.ejs
            }
            else {
                response.render("login", { msg: errorObj });
            }
        }
        else {
            request.session.currentUser = user; // Actualizar sesión
            response.status(200);
            response.redirect("/inicio");
        }
    });
});

// Cierre de sesión
app.post("/logout", userLogged, (request, response, next) => {
    // Eliminar variables de sesión
    delete(request.session.currentUser);
    delete(request.session.currentReservations);
    delete(request.session.oldReservations);
    delete(request.session.destination);
    delete(request.session.comments);
    response.status(200);
    response.redirect("/login");
});

// Realizar una búsqueda - TODO
app.post("/search", userLogged, (request, response, next) => {
    let errorObj = responseHandler.generateRes(-5);
    next(errorObj);
});

// Aplicar filtros - TODO
app.post("/filter", userLogged, (request, response, next) => {
    let errorObj = responseHandler.generateRes(-5);
    next(errorObj);
});

// Hacer una reserva
app.post("/book", userLogged, (request, response, next) => {
    let params = {
        idUser: request.session.currentUser.id,
        date: new Date(request.body.dateIni),
        nPeople: request.body.nPeople,
        idDest: request.body.idDest
    };
    ASRes.book(params, (error, totalPrice) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            if (error < 0) {
                next(errorObj); // Redirigir a error.ejs
            }
            else {
                response.render("destination", { 
                    dest: request.session.destination, 
                    comments: request.session.comments, 
                    user: { username: request.session.currentUser.username }, 
                    msg: errorObj});
            }
        }
        else {
            let msg = {
                cod: 0,
                title: "Reserva realizada",
                message: `Se ha completado la reserva con éxito, por un total de ${totalPrice}€`
            }
            let msgObj = responseHandler.generateRes(msg.cod, msg.title, msg.message);
            response.render("destination", { 
                dest: request.session.destination, 
                comments: request.session.comments, 
                user: { username: request.session.currentUser.username }, 
                msg: msgObj});
        }
    });
});

// Editar perfil
app.post("/edit_profile", userLogged, (request, response, next) => {
    let newUser = {
        id: request.session.currentUser.id,
        name: request.body.name,
        username: request.body.username,
        email: request.body.email
    };

    ASUse.updateUser(newUser, (error, user) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            if (error < 0) {
                next(errorObj); // Redirigir a error.ejs
            }
            else {
                response.render("user", { 
                    user: request.session.currentUser, 
                    currentReservations: request.session.currentReservations, 
                    oldReservations: request.session.oldReservations, 
                    msg: errorObj });
            }
        }
        else {
            let res = {
                cod: 0,
                title: "Perfil actualizado",
                message: "Tus datos han sido actualizados con éxito :)"
            }
            let msgObj = responseHandler.generateRes(res.cod, res.title, res.message);
            response.status(200);
            request.session.currentUser = user;
            response.render("user", { 
                user: user, 
                currentReservations: request.session.currentReservations, 
                oldReservations: request.session.oldReservations, 
                msg: msgObj });
        }
    });
});

// Cambiar contraseña - TODO
app.post("/change_password", userLogged, (request, response, next) => {
    let passwords = {
        id: request.session.currentUser.id,
        oldPass: request.body.oldPassword,
        newPass: request.body.newPassword
    };

    ASUse.changePassword(passwords, (error, user) => {
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            if (error < 0) {
                next(errorObj); // Redirigir a error.ejs
            }
            else {
                response.render("user", { 
                    user: request.session.currentUser, 
                    currentReservations: request.session.currentReservations, 
                    oldReservations: request.session.oldReservations, 
                    msg: errorObj });
            }
        }
        else {
            let res = {
                cod: 0,
                title: "Contraseña modificada",
                message: "Tu contraseña ha sido modificada con éxito :)"
            }
            let msgObj = responseHandler.generateRes(res.cod, res.title, res.message);
            response.status(200);
            request.session.currentUser = user;
            response.render("user", { 
                user: user, 
                currentReservations: request.session.currentReservations, 
                oldReservations: request.session.oldReservations, 
                msg: msgObj });
        }
    });
});

// Cancelar reserva
app.post("/cancel", (request, response, next) => {
    ASRes.cancel(request.body.idRes, request.session.currentUser.id, (error, idRes) =>{
        if (error) {
            let errorObj = responseHandler.generateRes(error);
            if (error < 0) {
                next(errorObj); // Redirigir a error.ejs
            }
            else {
                lresponse.render("user", { 
                    user: request.session.currentUser, 
                    currentReservations: request.session.currentReservations, 
                    oldReservations: request.session.oldReservations, 
                    msg: errorObj });
            }
        }
        else {
            let res = {
                cod: 0,
                title: "Reserva cancelada",
                message: `Se ha cancelado la reserva correctamente`
            }
            let msgObj = responseHandler.generateRes(res.cod, res.title, res.message);
            response.status(200);
            request.session.currentReservations = request.session.currentReservations.filter((r) => r.id != idRes);
            response.render("user", { 
                user: request.session.currentUser, 
                currentReservations: request.session.currentReservations, 
                oldReservations: request.session.oldReservations, 
                msg: msgObj });
        }
    });
});

// Dejar un comentario - TODO
app.post("/comment", userLogged, (request, response, next) => {
    let errorObj = responseHandler.generateRes(-5);
    next(errorObj);
});

// --- Middlewares de error ---
// Error 404
app.use((request, response, next) => {
    let error = responseHandler.generateRes(-2);
    response.status(error.code);
    response.render("error", { error: error });
});

// General
app.use((error, request, response, next) => {
    response.status(error.code);
    response.render("error", { error: error });
});

// --- Iniciar el servidor ---
app.listen(mySQLconfig.port, (error) => {
    if (error) {
        console.error(`Se ha producido un error al iniciar el servidor: ${error.message}`);
    }
    else {
        console.log(`Se ha arrancado el servidor en el puerto ${mySQLconfig.port}`);
    }
});