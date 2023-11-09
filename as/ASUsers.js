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
                // Existe el usuario?
                if (!user) {
                    callback(1);
                }
                else {
                    // Su contraseña es correcta?
                    if (user.password !== password) {
                        callback(2);
                    }
                    else {
                        delete (user.password);
                        callback(null, user);
                    }
                }
            }
        });
    }

    // Registro usuario
    signUp(newUser, callback) {
        // Comprobar el formato del correo
        if (/* formato no válido*/false) {
            callback(5);
        }
        else {
            // Comprobar que las contraseñas coinciden
            if (newUser.password !== newUser.repeatPass) {
                callback(4);
            }
            else {
                // Comprobar que el nombre de usuario no está repetido
                this.daoUse.readByUsername(newUser.username, (error, user) => {
                    if (error) {
                        callback(error);
                    }
                    else {
                        if (user) {
                            callback(3);
                        }
                        else {
                            this.daoUse.create(newUser, (error, user) => {
                                if (error) {
                                    callback(error);
                                }
                                else {
                                    callback(null, user);
                                }
                            });
                        }
                    }
                });
            }
        }
    }
}

module.exports = ASUsers;