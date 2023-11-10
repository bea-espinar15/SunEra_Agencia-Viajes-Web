"use strict"

document.addEventListener("DOMContentLoaded", function () {

    // Validación formulario Registro
    const formSignUp = document.getElementById("formSignUp");

    // Si estamos en sign_up.ejs
    if (formSignUp !== null) {
        formSignUp.addEventListener("submit", function (event) {
            event.preventDefault();
            // Si todo es correcto hacemos POST
            if (validateParamsSignUp()) {
                formSignUp.submit();
            }
        });

        // Validar entrada Registro
        function validateParamsSignUp() {
            // Obtener inputs
            let name = document.getElementById("nameSignUp").value;
            let username = document.getElementById("usernameSignUp").value;
            let email = document.getElementById("emailSignUp").value;
            let password = document.getElementById("passwordSignUp").value;
            let repeatPass = document.getElementById("repeatPassSignUp").value;

            // Expresiones Regex    
            let usernameRegex = /^[a-z_][a-z0-9_]{3,15}$/;
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

            // Campos no vacíos
            if (name === "" || username === "" || email === "" || password === "" || repeatPass === "") {
                Swal.fire({
                    icon: "error",
                    title: "¡Atención!",
                    text: "Asegúrate de haber completado todos los campos para poder completar el registro.",
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
            // Contraseñas coinciden
            else if (password !== repeatPass) {
                Swal.fire({
                    icon: "error",
                    title: "¡Atención!",
                    text: "Las contraseñas no coinciden.",
                    confirmButtonClass: "sweet-alert-button"
                });
                return false;
            }
            // Contraseña válida:
            else if (!passRegex.test(password)) {
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
    }

    // Validación formulario Login
    const formLogin = document.getElementById("formLogin");

    // Si estamos en login.ejs
    if (formLogin !== null) {
        formLogin.addEventListener("submit", function (event) {
            event.preventDefault();
            if (validateParamsLogin()) {
                formLogin.submit();
            }
        });

        // Validar entrada Login
        function validateParamsLogin() {
            // Obtener inputs
            let username = document.getElementById("usernameLogin").value;
            let password = document.getElementById("passwordLogin").value;

            // Campos no vacíos
            if (username === "" || password === "") {
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
    }

});