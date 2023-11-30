"use strict"

// Cuando cargue el DOM
$(() => {
    const button = $("#b");
    if (button.data("msg")) {
        button.click(); // Abrir modal
    }
});