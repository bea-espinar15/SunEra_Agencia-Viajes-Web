"use strict"

// Expresiones regex
const usernameRegex = /^[a-z_][a-z0-9_]{3,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

// Validación editar perfil
function validateParamsEditUser(name, username, email) {
    // Campos no vacíos
    if (name === "" || username === "" || email === "") {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de haber completado todos los campos para poder editar tu perfil.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Username válido
    else if (!usernameRegex.test(username)) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "El nombre de usuario no puede contener espacios en blanco ni mayúsculas, ni empezar por un número, y debe tener entre 4 y 16 caracteres.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Correo válido
    else if (!emailRegex.test(email)) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Por favor, introduce una dirección válida de correo electrónico.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    else {
        return true;
    }
}

// Validación cambiar contraseña
function validateParamsChangePass(oldPass, newPass) {
    // Campos no vacíos
    if (oldPass === "" || newPass === "") {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Tienes que completar ambos campos para cambiar tu contraseña.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Password válida
    else if (!passRegex.test(newPass)) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "La contraseña debe ser de, al menos, 8 caracteres, y contener al menos 1 letra y 1 número.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Contraseñas no coinciden
    else if (newPass === oldPass) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Las dos contraseñas que estás introduciendo son iguales.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    else {
        return true;
    }
}

// Cuando cargue el DOM
$(() => {
   
    // Obtener elementos
    const userPicInput = $("#user-pic-input");
    const userPic = $("#user-pic");
    // Obtener elementos Editar Perfil
    const formEditUser = document.getElementById("formEditUser");
    const name = $("#user-name");
    const username = $("#user-username");
    const email = $("#user-email");
    // Obtener elementos Cambiar contraseña
    const formChangePass = document.getElementById("formChangePass");
    const oldPass = $("#password");
    const newPass = $("#rep-password");

    // Funcionalidad cambiar foto de perfil
    userPic.on("click", () => {
        userPicInput.click();
    });

    // Formulario editar perfil
    formEditUser.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateParamsEditUser(name.val(), username.val(), email.val())) {
            formEditUser.submit();
        }
    });

    // Formulario cambiar contraseña
    formChangePass.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateParamsChangePass(oldPass.val(), newPass.val())) {
            formChangePass.submit();
        }
    });
    
});