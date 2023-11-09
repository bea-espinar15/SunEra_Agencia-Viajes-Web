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
    
    // Inicio de sesión
    login(username, password, callback) {
        this.daoUse.readByUsername(username, (error, user) => {
            if (error) {
                callback(error);
            }
            else {
                if (user.password !== password) {
                    callback(-1);
                }
                else {
                    delete (user.password);
                    callback(null, user);
                }
            }
        });
    }
}

module.exports = ASUsers;