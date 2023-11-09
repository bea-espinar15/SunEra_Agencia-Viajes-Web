"use strict"

class DAOUsers {
    // --- Atributos ---
    pool; 
    
    // --- Constructor ---
    constructor(pool) {
        this.pool = pool;
    }

    // --- Métodos --- 
    // Leer usuario
    read(idUser, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(error);
            }
            else {
                let querySQL = "SELECT * FROM usuario WHERE id = ?";
                connection.query(querySQL, [idUser], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(error);
                    }
                    else {
                        // No existe
                        if (rows.length === 0) {
                            callback(error)
                        }
                        // Error en la BBDD
                        else if (rows.length > 1) {
                            callback(error);
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
}

module.exports = DAOUsers;