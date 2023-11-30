"use strict"

// TODO
$(() => {

    const priceInput = $("#price");
    const priceSpan = $("#price-span");

    priceSpan.text(priceInput.val() + " €/p")

    priceInput.on("change", function (event) {
        event.preventDefault();
        priceSpan.text(priceInput.val() + " €/p")
    });
});