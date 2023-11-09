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
const errorTypes = require("./errorTypes");
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
const ASRes = new ASReservations(DAORes);
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
            next(error);
        }
        else {
            ASDes.getParams(destinations, (error, params) => {
                if (error) {
                    next(error);
                }
                else {
                    response.status(200);
                    response.render("index", { destinations: destinations, params: params, filters: [] });
                }
            });
        }
    });
});

// Login
app.get("/login", (request, response, next) => {
    response.status(200);
    response.render("login");
});

// SignUp
app.get("/sign_up", (request, response, next) => {
    response.status(200);
    response.render("sign_up");
});

// Trending
app.get("/tendencias", userLogged, (request, response, next) => {
    ASDes.getAllDestinations((error, destinations) => {
        if (error) {
            next(error);
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

// User [!] Middleware "es tu usuario"
app.get("/perfil", userLogged, (request, response, next) => {
    ASUse.getUser(request.session.currentUser.id, (error, user) => {
        if (error) {
            next(error);
        }
        else {
            ASRes.getReservationsByUser(user.id, (error, currentReservations, oldReservations) => {
                if (error) {
                    next(error);
                }
                else {
                    response.status(200);
                    response.render("user", { user: user, currentReservations: currentReservations, oldReservations: oldReservations });
                }
            })
        }
    })
});

// Destination
app.get("/destination/:id", userLogged, (request, response, next) => {
    ASDes.getDestination(request.params.id, (error, destination) => {
        if (error) {
            next(error);
        }
        else {
            ASDes.getCommentsByDestination(destination.id, (error, comments) => {
                if (error) {
                    next(error);
                }
                else {
                    response.status(200);
                    response.render("destination", { dest: destination, comments: comments, user: { username: request.session.currentUser.username }});
                }
            })
        }
    })
});

// --- Peticiones POST ---
// Inicio de sesión
app.post("/login", (request, response, next) => {
    ASUse.login(request.body.username, request.body.password, (error, user) => {
        if (error) {
            next(error);
        }
        else {
            request.session.currentUser = user;
            response.status(200);
            response.redirect("/inicio");
        }
    });
});

// Cierre de sesión
app.post("/logout", userLogged, (request, response, next) => {
    delete(request.session.currentUser);
    response.status(200);
    response.redirect("/login");
});

//book

//comment*

//search*

//filter*

//sign_up

//edit_profile*

//change_password*

//cancel


// --- Middlewares de error ---
// Error 404
app.use((request, response, next) => {
    response.status(errorTypes.error404.code);
    response.render("error", { error: errorTypes.error404 });
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