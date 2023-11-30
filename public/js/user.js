"use strict"

document.addEventListener("DOMContentLoaded", function () {

    const userPicInput = document.getElementById("user-pic-input");
    const userPic = document.getElementById("user-pic");

    // Funcionalidad cambiar foto de perfil
    userPic.addEventListener("click", () => {
        userPicInput.click();
    });

    // Validación formulario Editar Perfil
    const formEditUser = document.getElementById("formEditUser");
    
    formEditUser.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateParamsEditUser()) {
            formEditUser.submit();
        }
    });

    // Validar entrada Editar perfil
    function validateParamsEditUser() {
        // Obtener inputs
        let name = document.getElementById("user-name").value;
        let username = document.getElementById("user-username").value;
        let email = document.getElementById("user-email").value;

        // Expresiones Regex    
        let usernameRegex = /^[a-z_][a-z0-9_]{3,15}$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // Validación formulario Cambiar Contraseña
    const formChangePass = document.getElementById("formChangePass");
    
    formChangePass.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateParamsChangePass()) {
            formChangePass.submit();
        }
    });

    // Validar entrada Cambiar Contraseña
    function validateParamsChangePass() {
        // Obtener inputs
        let oldPass = document.getElementById("password").value;
        let newPass = document.getElementById("rep-password").value;

        // Expresión Regex
        let passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

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
    
});