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
        case -6: {
            code = 403;
            title = "Acción no permitida";
            message = "No sé qué estabas intentando hacer, pero esta reserva no es tuya!";
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
        } break;
        case 7: {
            code = 400;
            title = "Reserva ya cancelada";
            message = "Esta reserva ya estaba cancelada";
        } break;
        case 8: {
            code = 400;
            title = "Reserva pasada";
            message = "No se puede cancelar una reserva que ya ha finalizado o está en curso";
        } break;
        case 9: {
            code = 400;
            title = "Contraseña no válida";
            message = "La contraseña debe ser de, al menos, 8 caracteres, y contener al menos 1 letra y 1 número";
        } break;
        case 10: {
            code = 400;
            title = "Fecha no válida";
            message = "Las reservas deben hacerse desde hoy en adelante.";
        } break;
        case 11: {
            code = 400;
            title = "Campos vacíos";
            message = "Asegúrate de haber completado todos los campos para poder completar el registro.";
        } break;
        case 12: {
            code = 400;
            title = "Nombre de usuario no válido";
            message = "El nombre de usuario no puede contener espacios en blanco ni empezar por un número, y debe tener entre 4 y 16 caracteres.";
        } break;
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