"use strict"

$(() => {

    const priceInput = $("#price");
    const priceSpan = $("#price-span");

    priceSpan.text(priceInput.val() + " €/p")

    // Mostrar el precio de la barra seleccionado en cada momento
    priceInput.on("change", function (event) {
        event.preventDefault();
        priceSpan.text(priceInput.val() + " €/p")
    });

});