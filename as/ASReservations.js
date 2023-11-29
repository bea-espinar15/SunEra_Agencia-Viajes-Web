"use strict"

const utils = require("../utils");

class ASReservations {
    // --- Atributos ---
    daoRes;
    daoUse;
    daoDes;

    // --- Constructor ---
    constructor(daoRes, daoUse, daoDes) {
        this.daoRes = daoRes;
        this.daoUse = daoUse;
        this.daoDes = daoDes;
    }
    
    // --- Métodos ---
    // Leer reservas de un usuario
    getReservationsByUser(idUser, callback) {
        this.daoRes.readByUser(idUser, (error, reservations) => {
            if (error) {
                callback(error);
            }
            else {
                // Separamos actuales de antiguas
                let curr = new Array();
                let old = new Array();
                reservations.forEach(res => {
                    // Es actual si fecha_fin es posterior a hoy
                    let current = new Date(res.dateEnd) >= new Date();
                    // Formatear fechas
                    res.dateStart = utils.formatDate(res.dateStart);
                    res.dateEnd = utils.formatDate(res.dateEnd);
                    if (current) {
                        curr.push(res);
                    }
                    else {
                        old.push(res);
                    }
                });
                callback(null, curr, old);
            }
        })
    }

    // Hacer reserva
    book(params, callback) {
        // Parsear entrada
        let idUser = params.idUser;
        let dateStart = params.date;
        let nPeople = params.nPeople;
        let idDest = params.idDest;
        // Comprobar que la reserva es posterior a hoy
        if (new Date(dateStart) < new Date()) {
            callback(10);
        }
        else {
            // Comprobar que existe el usuario
            this.daoUse.read(idUser, (error, user) => {
                if (error) {
                    callback(error);
                }
                else {
                    // Comprobar que existe el destino
                    this.daoDes.read(idDest, (error, dest) => {
                        if (error) {
                            callback(error);
                        }
                        else {
                            // Obtenemos las plazas ocupadas en el destino durante esas fechas
                            this.daoRes.getBookedPlaces(dest.id, dateStart, dest.days, (error, bookedPlaces) => {
                                if (error) {
                                    callback(error);
                                }
                                else {
                                    // Comprobar que hay hueco
                                    if (nPeople > (dest.capacity - bookedPlaces)) {
                                        callback(6);
                                    }
                                    else {
                                        // Calcular datos de la reserva
                                        let dateEnd = new Date(dateStart);
                                        dateEnd.setDate(dateEnd.getDate() + dest.days);
                                        let totalPrice = dest.price * nPeople;
                                        // Crear reserva
                                        let reservation = {
                                            idUser: idUser,
                                            idDest: dest.id,
                                            dateStart: dateStart,
                                            dateEnd: dateEnd,
                                            totalPrice: totalPrice,
                                            nPeople: nPeople
                                        }
                                        // Insertar reserva en la BBDD
                                        this.daoRes.create(reservation, (error) => {
                                            if (error) {
                                                callback(error);
                                            }
                                            else {
                                                callback(null, totalPrice);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    // Cancelar reserva
    cancel(idRes, idUser, callback) {
        // Comprobar que existe la reserva y no estaba ya cancelada
        this.daoRes.read(idRes, (error, res) => {
            if (error) {
                callback(error);
            }
            else {
                // Comprobar que la reserva es del usuario
                if (res.idUser !== idUser) {
                    callback(-6);
                }                
                // Comprobar que la reserva no se había cancelado ya
                else if (!res.enabled) {
                    callback(7);
                }
                // Comprobar si la reserva ya ha pasado (o está en curso) y no se puede cancelar
                else if (new Date(res.dateStart) <= new Date()) {
                    callback(8);
                }
                else {
                    // Dar de baja (lógica)
                    this.daoRes.delete(idRes, (error) => {
                        if (error) {
                            callback(error);
                        }
                        else {
                            callback(null, idRes);
                        }
                    });
                }                
            }
        });
    }
    
}

module.exports = ASReservations;