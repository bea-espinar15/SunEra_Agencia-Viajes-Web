"use strict"

class DAOUsers {
    // --- Atributos ---
    pool; 
    
    // --- Constructor ---
    constructor(pool) {
        this.pool = pool;
    }

    // --- Métodos --- 
    // Crear usuario
    create(user, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "INSERT INTO usuario (nombre, correo, nombre_usuario, contraseña) VALUES (?, ?, ?, ?)";
                connection.query(querySQL, [user.name, user.email, user.username, user.password], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        callback(null);
                    }
                });
            }
        });
    }

    // Leer usuario
    read(idUser, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "SELECT * FROM usuario WHERE id = ?";
                connection.query(querySQL, [idUser], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        // No existe
                        if (rows.length === 0) {
                            callback(-4);
                        }
                        // Error en la BBDD
                        else if (rows.length > 1) {
                            callback(-1);
                        }
                        else {
                            // Construir usuario
                            let user = {
                                id: rows[0].id,
                                name: rows[0].nombre,
                                username: rows[0].nombre_usuario,
                                email: rows[0].correo,
                                password: rows[0].contraseña
                            }
                            callback(null, user);
                        }
                    }
                });
            }
        });
    }

    // Leer por nombre de usuario
    readByUsername(username, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "SELECT * FROM usuario WHERE nombre_usuario = ?";
                connection.query(querySQL, [username], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        // Error en la BBDD
                        if (rows.length > 1) {
                            callback(-1);
                        }
                        else {
                            // Lo devolvemos exista o no (sign_up y edit_profile quieren que no exista, login que sí)
                            let user;
                            if (rows.length > 0) {
                                // Reconstruir usuario
                                user = {
                                    id: rows[0].id,
                                    username: rows[0].nombre_usuario,
                                    password: rows[0].contraseña
                                }
                            }
                            callback(null, user);
                        }
                    }
                });
            }
        });
    }

    // Actualizar usuario
    update(newUser, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "UPDATE usuario SET nombre = ?, correo = ?, nombre_usuario = ?, contraseña = ? WHERE id = ?";
                connection.query(querySQL, [newUser.name, newUser.email, newUser.username, newUser.password, newUser.id], (error) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        callback(null);
                    }
                });
            }
        });
    }

}

module.exports = DAOUsers;