"use strict"

// Validación reserva
function validateReservation(params) {
    // Campos no vacíos
    if (!params.dateStart) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de seleccionar qué día te irás."
        });
        return false;
    }
    else if (!params.nPeople) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "Asegúrate de introducir cuántos vais a viajar."
        });
        return false;
    }
    // Fecha tiene que ser posterior a la actual
    else if (new Date(params.dateStart) < new Date()) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: "La reserva debe ser de hoy en adelante."
        });
        return false;
    }
    // Número de viajeros tiene que estar entre 1 y el máximo
    else if (params.nPeople < params.minPeople || params.nPeople > params.maxPeople) {
        Swal.fire({
            icon: "error",
            title: "¡Atención!",
            text: `Sólo podéis viajar entre ${params.minPeople} y ${params.maxPeople} personas.`
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
            text: "Debes dar una valoración entre 0 y 5"
        });
        return false;
    }
    else {
        return true;
    }
}

// Crear div comentario usuario
function buildUserComment(comment) {
    let imgSrc = "";
    if (comment.img) {
        imgSrc = `/imagen/${comment.idUser}`;
    }
    else {
        imgSrc = "/img/profile.png";
    }
    
    return `<div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <img class="pic" src="${imgSrc}" alt="Foto Usuario" width="30" height="30">
                        <p class="gray-text m-0 ms-2">@${comment.username}</p>
                        <p class="gray-text m-0 ms-2">${comment.date}</p>
                    </div>
                    <img src="/img/rate/${comment.ratePic}" alt="Valoración Usuario" height="15">
                    <p class="card-text mt-2">${comment.text}</p>
                </div>
            </div>`;
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
    // Itinerario
    const itinerarioButton = $("#itinerario-button");
    const itinerarioList = $("#itinerario-list");
    // Formulario comentario
    const divComment = $("#div-comment");
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

    // Itinerario
    itinerarioList.hide();
    itinerarioButton.on("click", () => {
        $.ajax({
            method: "GET",
            url: `/itinerario/${itinerarioButton.data("iddest")}`,
            success: (data) => {
                itinerarioList.empty();
                data.forEach((d, i) => {
                    let day = ` <div class="d-flex align-items-center">
                                    <img src="/img/bullet-point.png" alt="Punto del día" class="align-self-start">
                                    <div>
                                        <h3>Día ${i + 1}</h3>
                                        <p>${d.city}</p>
                                        <p>${d.desc}</p>
                                    </div>
                                </div>`;
                    itinerarioList.append(day);
                });
                itinerarioList.show();
            },
            error: (jqXHR, textStatus, errorThrown) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorThrown
                });
            }
        });
    });

    // Obtener comentario del usuario (o formulario de enviar si no tiene)
    $.ajax({
        method: "GET",
        url: `/comentUsuario/${divComment.data("iddest")}`,
        success: (comment) => {
            if (comment) {
                editComment.empty();
                editComment.append(buildUserComment(comment));
                createComment.hide();
                editComment.show();
            }
            else {
                editComment.hide();
                createComment.show();
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorThrown
            });
        }
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
                    createComment.hide();
                    editComment.empty();
                    editComment.append(buildUserComment(com));
                    editComment.show();
                    Swal.fire({
                        title: "Reseña añadida!",
                        text: "Tu comentario se ha añadido con éxito, gracias!",
                        icon: "success"
                      });
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: errorThrown
                    });
                }
            });
        }
    });

});