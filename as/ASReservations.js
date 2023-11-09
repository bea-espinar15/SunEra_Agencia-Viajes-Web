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
}

module.exports = ASReservations;