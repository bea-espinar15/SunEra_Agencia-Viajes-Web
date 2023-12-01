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

// Formatear fecha
function formatDate(date) {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Calcular precio total
function calculateTotalPrice(price, n) {
    return (price * n).toFixed(2);
}

$(() => {

    // Obtener elementos
    // Flechas carousel
    const prev = $("#p");
    const next = $("#n");
    // Formulario reserva
    const formBook = $("#formBook");
    const dateStart = $("#date-ini");
    const nPeople = $("#n-people");
    const minPeople = parseInt($("#n-people").min);
    const maxPeople = parseInt($("#n-people").max);
    const dateStartSum = $("#dateStartSummary");
    const dateEndSum = $("#dateEndSummary");
    const nPeopleSum = $("#nPeopleSummary");
    const totalPriceSum = $("#totalPriceSummary");
    const closeModal = $("#close-modal-res")
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

    // Itinerario
    itinerarioList.hide();
    itinerarioButton.on("click", () => {
        $.ajax({
            method: "GET",
            url: `/itinerario/${itinerarioButton.data("iddest")}`,
            success: (data) => {
                itinerarioList.empty();
                itinerarioList.show();
                data.forEach((d, i) => {
                    let day = $(`<div id="day-${d.nDia}" class="d-flex align-items-center my-4" style="display: none;">
                                    <img src="/img/bullet-point.png" alt="Punto del día" width="40" class="align-self-start">
                                    <div class="ms-3">
                                        <h3 class="iti-day m-0">Día ${d.nDia}</h3>
                                        <p class="p-city m-0">${d.city}</p>
                                        <p class="mt-2">${d.desc}</p>
                                    </div>
                                </div>`);
                    setTimeout(() => {
                        itinerarioList.append(day.hide().fadeIn(600)); // Transición suave al aparecer
                    }, i * 80); // Esperar antes de mostrar el siguiente día                     
                });
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.responseText
                });
            }
        });
    });

    // Actualizar valores de la reserva automáticamente
    dateStartSum.text(" Ida: ");
    dateEndSum.text("Vuelta: ");
    nPeopleSum.text(`${nPeople.val()} persona`);
    totalPriceSum.text(`Precio total: ${calculateTotalPrice(totalPriceSum.data("price"), nPeople.val())}€`);

    nPeople.on("change", () => {
        if (nPeople.val() !== "") {
            nPeopleSum.text(`${nPeople.val()} personas`);
            totalPriceSum.text(`Precio total: ${calculateTotalPrice(totalPriceSum.data("price"), nPeople.val())}€`);
        }
        else {
            nPeopleSum.text("0 personas");
            totalPriceSum.text("Precio total: 0€");
        }
    });

    dateStart.on("change", () => {
        if (dateStart.val() && nPeople.val()) {
            // Formatear fecha
            let formatDateStart = formatDate(new Date(dateStart.val()));
            dateStartSum.text(`Ida: ${formatDateStart}`);

            // Obtener la fecha de vuelta y formatear
            let formatDateEnd = formatDate(new Date(new Date(dateStart.val()).getTime() + dateEndSum.data("days") * 24 * 60 * 60 * 1000));
            dateEndSum.text(`Vuelta: ${formatDateEnd}`);
        }
        else if (!dateStart.val()) {
            dateStartSum.text(" Ida: ");
            dateEndSum.text("Vuelta: ");
            totalPriceSum.text("Precio total: 0€");
        }
    });

    // Formulario reserva
    formBook.on("submit", (event) => {
        event.preventDefault();
        let params = {
            dateStart: dateStart.val(),
            nPeople: nPeople.val(),
            minPeople: minPeople,
            maxPeople: maxPeople
        };
        if (validateReservation(params)) {
            $.ajax({
                method: "POST",
                url: "/book",
                data: {
                    dateIni: dateStart.val(),
                    nPeople: nPeople.val(),
                    idDest: idDest.val()
                },
                success: (totalPrice) => {
                    closeModal.click();
                    Swal.fire({
                        title: "Reserva realizada!",
                        text: `Se ha completado la reserva con éxito, por un total de ${totalPrice.toFixed(2)}€`,
                        icon: "success"
                      });
                },
                error: (error) => {
                    closeModal.click();
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.responseText
                    });
                }
            });
        }
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
        error: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.responseText
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
                    createComment.hide(); // Ya no puede comentar más
                    editComment.empty();
                    editComment.append(buildUserComment(com));
                    editComment.show();
                    Swal.fire({
                        title: "Reseña añadida!",
                        text: "Tu comentario se ha añadido con éxito, gracias!",
                        icon: "success"
                      });
                },
                error: (error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.responseText
                    });
                }
            });
        }
    });

});