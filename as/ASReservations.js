"use strict"

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
                    res.dateStart = ASReservations.formatDate(res.dateStart);
                    res.dateEnd = ASReservations.formatDate(res.dateEnd);
                    if (res.enabled) {
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
        let idUser = params.idUser;
        let dateStart = params.date;
        let nPeople = params.nPeople;
        let idDest = params.idDest;
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
                        // Comprobar que hay hueco
                        this.daoRes.getBookedPlaces(dest.id, dateStart, dest.days, (error, bookedPlaces) => {
                            if (error) {
                                callback(error);
                            }
                            else {
                                if (nPeople > (dest.capacity - bookedPlaces)) {
                                    callback(6);
                                }
                                else {
                                    // Calcular datos de la reserva
                                    let dateEnd = new Date();
                                    dateEnd.setDate(dateStart.getDate() + dest.days);
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

    // Formatear fechas
    static formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // En JavaScript los meses van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

module.exports = ASReservations;