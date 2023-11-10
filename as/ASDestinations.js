"use strict"

class ASDestinations {
    // --- Atributos ---
    daoDes;

    // --- Constructor ---
    constructor(daoDes) {
        this.daoDes = daoDes;
    }
    
    // --- Métodos ---
    // Leer destino
    getDestination(idDest, callback) {
        this.daoDes.read(idDest, (error, dest) => {
            if (error) {
                callback(error);
            }
            else {
                dest.ratePic = "rate-" + ASDestinations.rateCalculator(dest.rate);
                // Obtener imágenes del destino
                this.daoDes.readImagesByDestination(dest.id, (error, imgs) => {
                    if (error) {
                        callback(error);
                    }
                    else {
                        dest.pictures = imgs; // Añadir fotos al objeto destino
                        callback(null, dest);
                    }
                });
            }
        });
    }

    // Leer todos los destinos
    getAllDestinations(callback) {
        this.daoDes.readAll((error, destinations) => {
            if (error) {
                callback(error);
            }
            else {
                // Construir la ruta (imagen valoración) de cada destino
                destinations.forEach(dest => {
                    dest.ratePic = "rate-" + ASDestinations.rateCalculator(dest.rate);
                });
                callback(null, destinations);
            }
        });
    }

    // Calcular parámetros máximos y mínimos (filtros Inicio)
    getParams(destinations, callback) {
        let maxDays, maxCapacity, minPrice, maxPrice;
        // Calcular máximos y mínimos
        destinations.forEach(dest => {
            if (!maxDays || dest.days > maxDays) {
                maxDays = dest.days;
            }
            if (!maxCapacity || dest.capacity > maxCapacity) {
                maxCapacity = dest.capacity;
            }
            if (!minPrice || dest.price < minPrice) {
                minPrice = dest.price;
            }
            if (!maxPrice || dest.price > maxPrice) {
                maxPrice = dest.price;
            }
        });

        // Resultado
        let params = { 
            maxDays: maxDays,
            maxCapacity: maxCapacity,
            minPrice: minPrice,
            maxPrice: maxPrice
        }
        callback(null, params);
    }

    // Leer reseñas de un destino
    getCommentsByDestination(idDest, callback) {
        // Comprobar que existe el destino
        this.daoDes.read(idDest, (error, dest) => {
            if (error) {
                callback(error);
            }
            else {
                // Obtener sus reseñas
                this.daoDes.readCommentsByDestination(dest.id, (error, comments) => {
                    if (error) {
                        callback(error);
                    }
                    else {
                        // Construir la ruta (imagen valoración) de cada reseña
                        comments.forEach(com => {
                            com.ratePic = "rate-" + ASDestinations.rateCalculator(com.rate);
                        });
                        callback(null, comments);
                    }
                });
            }
        });
    }

    // --- Métodos estáticos auxiliares ---
    // Aproximar a .00 o .50 y construir ruta imagen
    static rateCalculator(num) {
        let rate;
        if (num < 0.2){
            rate = "0";
        }
        else if (num >= 0.2 && num < 0.7){
            rate = "0_5";
        }
        else if (num >= 0.7 && num < 1.2){
            rate = "1";
        }
        else if (num >= 1.2 && num < 1.7){
            rate = "1_5";
        }
        else if (num >= 1.7 && num < 2.2){
            rate = "2";
        }
        else if (num >= 2.2 && num < 2.7){
            rate = "2_5";
        }
        else if (num >= 2.7 && num < 3.2){
            rate = "3";
        }
        else if (num >= 3.2 && num < 3.7){
            rate = "3_5";
        }
        else if (num >= 3.7 && num < 4.2){
            rate = "4";
        }
        else if (num >= 4.2 && num < 4.7){
            rate = "4_5";
        }
        else {
            rate = "5";
        }
        return rate + ".png";
    }
}

module.exports = ASDestinations;