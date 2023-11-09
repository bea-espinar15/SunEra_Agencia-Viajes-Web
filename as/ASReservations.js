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

    // Formatear fechas
    static formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // En JavaScript los meses van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

module.exports = ASReservations;