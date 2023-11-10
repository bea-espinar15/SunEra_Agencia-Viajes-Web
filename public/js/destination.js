"use strict"

let prev = document.getElementById('p');
let next = document.getElementById('n');

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