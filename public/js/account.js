"use strict"

// Expresiones regex
const usernameRegex = /^[a-z_][a-z0-9_]{3,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

// Validación Registro
function validateParamsSignUp(params) {
    // Campos no vacíos
    if (params.name === "" || params.username === "" || params.email === "" || params.password === "" || params.repeatPass === "") {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de haber completado todos los campos para poder completar el registro.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Username válido
    else if (!usernameRegex.test(params.username)) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "El nombre de usuario no puede contener espacios en blanco ni mayúsculas, ni empezar por un número, y debe tener entre 4 y 16 caracteres.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Correo válido
    else if (!emailRegex.test(params.email)) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Por favor, introduce una dirección válida de correo electrónico.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Contraseñas coinciden
    else if (params.password !== params.repeatPass) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Las contraseñas no coinciden.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Contraseña válida:
    else if (!passRegex.test(params.password)) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "La contraseña debe ser de, al menos, 8 caracteres, y contener al menos 1 letra y 1 número.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    else {
        return true;
    }
}

// Validación Login
function validateParamsLogin(params) {
    // Campos no vacíos
    if (params.username === "" || params.password === "") {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de haber completado todos los campos para iniciar sesión.",
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

    // Obtener elementos SignUp
    const formSignUp = document.getElementById("formSignUp");
    const name = $("#nameSignUp");
    const usernameSignUp = $("#usernameSignUp");
    const email = $("#emailSignUp");
    const passwordSignUp = $("#passwordSignUp");
    const repeatPass = $("#repeatPassSignUp");
    // Obtener elementos Login
    const formLogin = document.getElementById("formLogin");
    const usernameLogin = $("#usernameLogin");
    const passwordLogin = $("#passwordLogin");
    
    // Si estamos en sign_up.ejs
    if (formSignUp) {
        formSignUp.addEventListener("submit", (event) => {
            event.preventDefault();
            // Si todo es correcto hacemos POST
            let params = {
                name: name.val(),
                username: usernameSignUp.val(),
                email: email.val(),
                password: passwordSignUp.val(),
                repeatPass: repeatPass.val()
            };
            if (validateParamsSignUp(params)) {
                formSignUp.submit();
            }
        });
    }

    // Si estamos en login.ejs
    if (formLogin) {
        formLogin.addEventListener("submit", (event) => {
            event.preventDefault();
            // Si todo es correcto hacemos POST
            let params = {
                username: usernameLogin,
                password: passwordLogin
            };
            if (validateParamsLogin(params)) {
                formLogin.submit();
            }
        });
    }

});