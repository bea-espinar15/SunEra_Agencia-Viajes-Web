"use strict"

function generateRes(cod, title="", message ="") {
    let code;
    switch (cod) {
        case -1: {
            code = 500;
            title = "Error con la Base de Datos";
            message = "Lo sentimos, se ha producido un error en la conexión con la Base de Datos. Por favor, vuelve a intentarlo en unos instantes.";
        } break;
        case -2: {
            code = 404;
            title = "Oops! Página no encontrada :(";
            message = "La página a la que intentas acceder no existe.";
        } break;
        case -3: {
            code = 404;
            title = "Destino inexistente";
            message = "Vaya! Aún no tenemos este destino disponible. Pero seguro que en breves podremos añadirlo ;)";
        } break;
        case -4: {
            code = 403;
            title = "Acceso no permitido";
            message = "No sé qué estabas intentando hacer, pero aquí no puedes entrar!";
        } break;
        case -5: {
            code = 501;
            title = "No implementado";
            message = "Oops! Aún no tenemos esta funcionalidad disponible";
        } break;
        case 0: {
            code = 200;
        } break;
        case 1: {
            code = 400;
            title = "Usuario inexistente";
            message = "El usuario introducido no existe";
        } break;
        case 2: {
            code = 400;
            title = "Contraseña incorrecta";
            message = "Contraseña incorrecta";
        } break;
        case 3: {
            code = 400;
            title = "Usuario repetido";
            message = "Este nombre de usuario no está disponible";
        } break;
        case 4: {
            code = 400;
            title = "Contraseña no coincide";
            message = "Las contraseñas no coinciden";
        } break;
        case 5: {
            code = 400;
            title = "Correo no válido";
            message = "Por favor, introduce una dirección válida de correo electrónico";
        } break;
        case 6: {
            code = 400;
            title = "Sin hueco";
            message = "No quedan suficientes plazas disponibles en este destino durante estas fechas :(";
        }
        default: {
            code = 500;
            title = "Error desconocido";
            message = "Lo sentimos, se ha producido un error desconocido";
        }
    }

    let res = {
        code: code,
        title: title,
        message: message
    }
    return res;
}

module.exports = {
    generateRes: generateRes
}