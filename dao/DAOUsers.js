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
                        // Construir nuevo usuario
                        let user = {
                            id: rows.insertId,
                            username: rows.nombre_usuario
                        }
                        callback(null, user);
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
                            // Construir destino
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
                        if (rows.length > 1) {
                            callback(-1);
                        }
                        else {
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

}

module.exports = DAOUsers;