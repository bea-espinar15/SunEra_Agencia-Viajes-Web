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
        let valid = ASUsers.validateParams(newUser);
        if (valid !== 0) {
            callback(valid);
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

    // Validar parámetros de registro de usuario
    static validateParams(user) {
        let usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{3,15}$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

        // Campos no vacíos
        if (user.name === "" || user.username === "" || user.email === "" || user.password === "" || user.repeatPass === "") {
            return 11;
        }
        // Username válido
        else if (!usernameRegex.test(user.username)) {
            return 12;
        }
        // Correo válido
        else if (!emailRegex.test(user.email)) {
            return 5;
        }
        // Contraseñas coinciden
        else if (user.password !== user.repeatPass) {
            return 4;
        }
        // Contraseña válida:
        else if (!passRegex.test(user.password)) {
            return 9;
        }
        else {
            return 0;
        }
    }
}

module.exports = ASUsers;