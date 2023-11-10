"use strict"

document.addEventListener("DOMContentLoaded", function () {

    // Navegar por las imágenes con las teclas izq-dcha
    let prev = document.getElementById('p');
    let next = document.getElementById('n');
    
    window.addEventListener('keydow', (e) => {
        switch (e.key) {
            case 'ArroRight':
                next.click();
                break;
            case 'ArroLeft':
                prev.click();
                break;
            default:
                break;
        }

    });

    // Validar formulario de reserva
    const formBook = document.getElementById("formBook");

    formBook.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateReservation()) {
            formBook.submit();
        }
    });

    // Validar entrada Login
    function validateReservation() {
        // Obtener inputs
        let dateStart = document.getElementById("date-ini").value;
        let nPeople = parseInt(document.getElementById("n-people").value);
        let minPeople = parseInt(document.getElementById("n-people").min);
        let maxPeople = parseInt(document.getElementById("n-people").max);

        // Campos no vacíos
        if (!dateStart) {
            Swal.fire({
                icon: "error",
                title: "¡Atención!",
                text: "Asegúrate de seleccionar qué día te irás.",
                confirmButtonClass: "sweet-alert-button"
            });
            return false;
        }
        else if (!nPeople) {
            Swal.fire({
                icon: "error",
                title: "¡Atención!",
                text: "Asegúrate de introducir cuántos vais a viajar.",
                confirmButtonClass: "sweet-alert-button"
            });
            return false;
        }
        // Fecha tiene que ser posterior a la actual
        else if (new Date(dateStart) < new Date()) {
            Swal.fire({
                icon: "error",
                title: "¡Atención!",
                text: "La reserva debe ser de hoy en adelante.",
                confirmButtonClass: "sweet-alert-button"
            });
            return false;
        }
        // Número de viajeros tiene que estar entre 1 y el máximo
        else if (nPeople < minPeople || nPeople > maxPeople) {
            Swal.fire({
                icon: "error",
                title: "¡Atención!",
                text: `Sólo podéis viajar entre ${minPeople} y ${maxPeople} personas.`,
                confirmButtonClass: "sweet-alert-button"
            });
            return false;
        }
        else {
            return true;
        }
    }


});