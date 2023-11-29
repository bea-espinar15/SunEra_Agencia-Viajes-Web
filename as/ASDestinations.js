"use strict"

const utils = require("../utils");

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
                dest.ratePic = "rate-" + utils.rateCalculator(dest.rate);
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
                    dest.ratePic = "rate-" + utils.rateCalculator(dest.rate);
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
                            com.ratePic = "rate-" + utils.rateCalculator(com.rate);
                        });
                        callback(null, comments);
                    }
                });
            }
        });
    }

    // Comprobas si un usuario ya ha comentado
    hasAlreadyCommented(idUser, idDest, callback) {
        // Comprobar que existe el destino
        this.daoDes.read(idDest, (error, dest) => {
            if (error) {
                callback(error);
            }
            else {
                // Obtener sus reseñas
                this.daoDes.readCommentByUser(idUser, dest.id, (error, commented) => {
                    if (error) {
                        callback(error);
                    }
                    else {
                        callback(null, commented);
                    }
                });
            }
        });
    }

    // Buscar destino(s)
    search(searchQuery, callback) {
        if (!searchQuery || searchQuery === "") {
            searchQuery === "";
        }
        else {
            searchQuery.toLowerCase();
        }

        this.daoDes.search(searchQuery, (error, destinations) => {
            if (error) {
                callback(error);
            }
            else {
                // Construir la ruta (imagen valoración) de cada destino
                destinations.forEach(dest => {
                    dest.ratePic = "rate-" + utils.rateCalculator(dest.rate);
                });
                callback(null, destinations);
            }
        });
    }

    // Aplicar filtros
    filter(params, callback) {
        // Generar filtros
        let filters = new Array();
        // Días
        if (params.days) {
            if (params.days < 1 || params.days > params.maxDays) {
                callback(15);
            }
            else {
                filters.push({ range: "≤", value: params.days, name: " días"});
            }
        }
        // Nº viajeros
        if (params.nPeople) {
            if (params.nPeople < 1 || params.nPeople > params.maxCapacity) {
                callback(15);
            }
            else {
                filters.push({ range: "≥", value: params.nPeople, name: " viajeros"});
            }
        }
        // Precio
        if (params.price < params.minPrice || params.price > params.maxPrice) {
            callback(15);
        }
        else {
            filters.push({ range: "≤", value: params.price, name: "€/p"});
        }
        // Valoración media
        if (params.rate) {
            if (params.rate < 0 || params.rate > 5) {
                callback(15);
            }
            else {
                filters.push({ range: "≥", value: params.rate, name: " estrellas"});
            }
        }

        this.daoDes.filter(params, (error, destinations) => {
            if (error) {
                callback(error);
            }
            else {
                // Construir la ruta (imagen valoración) de cada destino
                destinations.forEach(dest => {
                    dest.ratePic = "rate-" + utils.rateCalculator(dest.rate);
                });
                callback(null, destinations, filters);
            }
        });
    }

}

module.exports = ASDestinations;