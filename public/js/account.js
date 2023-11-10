"use strict"

document.addEventListener("DOMContentLoaded", function () {

    // Validación formulario Registro
    const formSignUp = document.getElementById("formSignUp");

    if (formSignUp !== null) {
        formSignUp.addEventListener("submit", function (event) {
            event.preventDefault();
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
            let usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{3,15}$/;
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

            // Campos no vacíos
            if (name === "" || username === "" || email === "" || password === "" || repeatPass === "") {
                alert("¡ATENCIÓN! Asegúrate de haber completado todos los campos para poder completar el registro.");
                return false;
            }
            // Username válido
            else if (!usernameRegex.test(username)) {
                alert("¡ATENCIÓN! El nombre de usuario no puede contener espacios en blanco ni empezar por un número, y debe tener entre 4 y 16 caracteres.");
                return false;
            }
            // Correo válido
            else if (!emailRegex.test(email)) {
                alert("¡ATENCIÓN! Por favor, introduce una dirección válida de correo electrónico.");
                return false;
            }
            // Contraseñas coinciden
            else if (user.password !== repeatPass) {
                alert("¡ATENCIÓN! Las contraseñas no coinciden.");
                return false;
            }
            // Contraseña válida:
            else if (!passRegex.test(password)) {
                alert("¡ATENCIÓN! La contraseña debe ser de, al menos, 8 caracteres, y contener al menos 1 letra y 1 número.");
                return false;
            }
            else {
                return true;
            }
        }
    }

    // Validación formulario Login
    const formLogin = document.getElementById("formLogin");

    if (formLogin !== null) {
        formLogin.addEventListener("submit", function (event) {
            event.preventDefault();

            if (validateParamsLogin()) {
                formLogin.submit();
            }
        });

        // Validar entrada Login
        function validateParamsLogin() {
            let username = document.getElementById("usernameLogin").value;
            let password = document.getElementById("passwordLogin").value;

            // Campos no vacíos
            if (username === "" || password === "") {
                alert("¡ATENCIÓN! Asegúrate de haber completado todos los campos para iniciar sesión.");
                return false;
            }
            else {
                return true;
            }
        }
    }

});