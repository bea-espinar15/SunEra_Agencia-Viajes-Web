"use strict"

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