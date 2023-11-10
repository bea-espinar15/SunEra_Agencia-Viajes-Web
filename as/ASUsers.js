"use strict"

class ASUsers {
    // --- Atributos ---
    daoUse;

    // --- Constructor ---
    constructor(daoUse) {
        this.daoUse = daoUse;
    }
    
    // --- Métodos ---
    // Registro usuario
    signUp(newUser, callback) {
        let valid = ASUsers.validateParams(newUser, true);
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
                        this.daoUse.create(newUser, (error) => {
                            if (error) {
                                callback(error);
                            }
                            else {
                                callback(null);
                            }
                        });
                    }
                }
            });
        }
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
    
    // Editar perfil
    updateUser(newUser, callback) {
        let valid = ASUsers.validateParams(newUser, false);
        if (valid !== 0) {
            callback(valid);
        }
        else {
            // Comprobar si existe el usuario
            this.daoUse.read(newUser.id, (error, user) => {
                if (error) {
                    callback(error);
                }
                else {
                    newUser.password = user.password;
                    // Comprobar si el nuevo nombre de usuario está repetido
                    if (newUser.username !== user.username) {
                        this.daoUse.readByUsername(newUser.username, (error, repeatUser) => {
                            if (error) {
                                callback(error);
                            }
                            else {
                                if (repeatUser) {
                                    callback(3);
                                }
                                else {
                                    // Actualizar usuario
                                    this.daoUse.update(newUser, (error) => {
                                        if (error) {
                                            callback(error);
                                        }
                                        else {
                                            callback(null, newUser);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        // Actualizar usuario
                        this.daoUse.update(newUser, (error) => {
                            if (error) {
                                callback(error);
                            }
                            else {
                                callback(null, newUser);
                            }
                        });
                    }
                }
            });
        }
    }    

    // Cambiar contraseña del usuario
    changePassword(passwords, callback) {
        let passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

        // Comprobar que la contraseña nueva es válida
        if (!passRegex.test(passwords.newPass)) {
            callback(9);
        }
        else {
            // Comprobar que la contraseña nueva es distinta a la anterior
            if (passwords.newPass === passwords.oldPass) {
                callback(13);
            }
            else {
                // Comprobar que el usuario existe y su contraseña es correcta
                this.daoUse.read(passwords.id, (error, user) => {
                    if (error) {
                        callback(error);
                    }
                    else {
                        if (passwords.oldPass !== user.password) {
                            callback(2);
                        }
                        else {
                            user.password = passwords.newPass;
                            this.daoUse.update(user, (error) => {
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

    // Validar parámetros de registro de usuario y editar perfil
    static validateParams(user, signup) {
        let usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{3,15}$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passRegex = /(?=.*[A-Za-z])(?=.*\d).{8,}/;

        // Campos no vacíos
        if (user.name === "" || user.username === "" || user.email === "") {
            return 11;
        }
        else if (signup && (user.password === "" || user.repeatPass === "")) {
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
        else if (signup && user.password !== user.repeatPass) {
            return 4;
        }
        // Contraseña válida:
        else if (signup && !passRegex.test(user.password)) {
            return 9;
        }
        else {
            return 0;
        }
    }

}

module.exports = ASUsers;