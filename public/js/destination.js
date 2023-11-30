"use strict"

// Validación reserva
function validateReservation(params) {
    // Campos no vacíos
    if (!params.dateStart) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de seleccionar qué día te irás.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    else if (!params.nPeople) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de introducir cuántos vais a viajar.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Fecha tiene que ser posterior a la actual
    else if (new Date(params.dateStart) < new Date()) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "La reserva debe ser de hoy en adelante.",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    // Número de viajeros tiene que estar entre 1 y el máximo
    else if (params.nPeople < params.minPeople || params.nPeople > params.maxPeople) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: `Sólo podéis viajar entre ${params.minPeople} y ${params.maxPeople} personas.`,
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    else {
        return true;
    }
}

// Validación comentar
function validateComment(params) {
    // Campo no vacío
    if (params.rate === "") {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Debes dar una valoración entre 0 y 5",
            confirmButtonClass: "sweet-alert-button"
        });
        return false;
    }
    else {
        return true;
    }
}

$(() => {

    // Obtener elementos
    // Flechas carousel
    const prev = $("#p");
    const next = $("#n");
    // Formulario reserva
    const formBook = document.getElementById("formBook");
    const dateStart = $("#date-ini");
    const nPeople = $("#n-people");
    const minPeople = parseInt($("#n-people").min);
    const maxPeople = parseInt($("#n-people").max);
    // Formulario comentario
    const formComment = $("#comment");
    const commentRate = $("#comment-rate");
    const text = $("#text");
    const idDest = $("#id-dest");
    const createComment = $("#create-comment");
    const editComment = $("#edit-comment");

    // Navegar por las imágenes con las teclas izq-dcha
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

    // Formulario reserva
    formBook.addEventListener("submit", function (event) {
        event.preventDefault();
        let params = {
            dateStart: dateStart.val(),
            nPeople: nPeople.val(),
            minPeople: minPeople,
            maxPeople: maxPeople
        };
        if (validateReservation(params)) {
            formBook.submit();
        }
    });

    // Obtener comentario del usuario (o formulario de enviar si no tiene)
    $.ajax({
        // GET 
    });

    // Formulario comentario
    formComment.on("submit", function (event) {
        event.preventDefault();
        let params = {
            rate: commentRate.val()
        };
        if (validateComment(params)) {
            $.ajax({
                method: "POST",
                url: "/comment",
                data: {
                    rate: commentRate.val(),
                    text: text.val(),
                    idDest: idDest.val()
                },
                success: (com) => {
                    // Sweet alert todo ok
                    createComment.hide();
                    editComment.empty();
                    editComment.append(buildUserComment(data));
                    editComment.show();
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    // Sweet alert error
                }
            });
        }
    });

});