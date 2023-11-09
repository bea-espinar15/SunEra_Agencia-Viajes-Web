"use strict"

class ASUsers {
    // --- Atributos ---
    daoUse;

    // --- Constructor ---
    constructor(daoUse) {
        this.daoUse = daoUse;
    }
    
    // --- Métodos ---
    // Leer usuario
    getUser(idUser, callback) {
        this.daoUse.read(idUser, (error, user) => {
            if (error) {
                callback(error);
            }
            else {
                callback(null, user);
            }
        });
    }
}

module.exports = ASUsers;