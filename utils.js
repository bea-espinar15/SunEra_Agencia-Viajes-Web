"use strict"

// Calcula el valor para aportar la imagen de la valoración media
function rateCalculator(num) {
    let rate;
    if (num < 0.2) {
        rate = "0";
    }
    else if (num >= 0.2 && num < 0.7) {
        rate = "0_5";
    }
    else if (num >= 0.7 && num < 1.2) {
        rate = "1";
    }
    else if (num >= 1.2 && num < 1.7) {
        rate = "1_5";
    }
    else if (num >= 1.7 && num < 2.2) {
        rate = "2";
    }
    else if (num >= 2.2 && num < 2.7) {
        rate = "2_5";
    }
    else if (num >= 2.7 && num < 3.2) {
        rate = "3";
    }
    else if (num >= 3.2 && num < 3.7) {
        rate = "3_5";
    }
    else if (num >= 3.7 && num < 4.2) {
        rate = "4";
    }
    else if (num >= 4.2 && num < 4.7) {
        rate = "4_5";
    }
    else {
        rate = "5";
    }
    return rate + ".png";
}

// Formatear fechas - Cogido de Internet
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // En JavaScript los meses van de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


module.exports = {
    rateCalculator: rateCalculator,
    formatDate: formatDate
};