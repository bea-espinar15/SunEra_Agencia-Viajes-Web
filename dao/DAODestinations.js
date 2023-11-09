"use strict"

class DAODestinations {
    // --- Atributos ---
    pool; 
    
    // --- Constructor ---
    constructor(pool) {
        this.pool = pool;
    }

    // --- Métodos --- 
    // Leer destino
    read(idDest, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(error);
            }
            else {
                let querySQL = "SELECT * FROM destino WHERE id = ?";
                connection.query(querySQL, [idDest], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(error);
                    }
                    else {
                        // No existe
                        if (rows.length === 0) {
                            callback(-1)
                        }
                        // Error en la BBDD
                        else if (rows.length > 1) {
                            callback(-1);
                        }
                        else {
                            // Construir destino
                            let dest = {
                                id: rows[0].id,
                                name: rows[0].nombre,
                                desc: rows[0].descripción,
                                price: rows[0].precio,
                                capacity: rows[0].aforo,
                                rate: rows[0].valoración_media,
                                country: rows[0].país,
                                days: rows[0].días
                            }
                            callback(null, dest);
                        }
                    }
                });
            }
        });
    }

    // Leer imágenes de un destino
    readImagesByDestination(idDest, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(error);
            }
            else {
                let querySQL = "SELECT * FROM imagen WHERE id_destino = ? ORDER BY id ASC";
                connection.query(querySQL, [idDest], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(error);
                    }
                    else {
                        let pictures = new Array();
                        rows.forEach(row => {
                            let pic = row.img;
                            pictures.push(pic);
                        });
                        callback(null, pictures);
                    }
                });
            }
        });
    }

    // Leer todos los destinos
    readAll(callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(error);
            }
            else {
                let querySQL = "SELECT * FROM destino JOIN (SELECT id_destino, MIN(id), img FROM Imagen GROUP BY id_destino)" + 
                               "AS subquery ON destino.id = subquery.id_destino ORDER BY valoración_media DESC";
                connection.query(querySQL, (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(error);
                    }
                    else {
                        let destinations = new Array();
                        rows.forEach(row => {
                            // Construir destino
                            let dest = {
                                id: row.id,
                                name: row.nombre,
                                desc: row.descripción,
                                price: row.precio,
                                capacity: row.aforo,
                                rate: row.valoración_media,
                                country: row.país,
                                days: row.días,
                                pic: row.img
                            }
                            destinations.push(dest);
                        });
                        callback(null, destinations);
                    }
                });
            }
        });
    }

    // Leer comentarios de un destino (con el usuario)
    readCommentsByDestination(idDest, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(error);
            }
            else {
                let querySQL = "SELECT reseña.*, usuario.nombre_usuario AS username FROM reseña JOIN usuario ON reseña.id_usuario = usuario.id WHERE id_destino = ? ORDER BY fecha DESC";
                connection.query(querySQL, [idDest], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(error);
                    }
                    else {
                        let comments = new Array();
                        rows.forEach(row => {
                            let comment = {
                                 username: row.username,
                                 rate: row.valoracion,
                                 text: row.comentario
                            }
                            comments.push(comment);
                        });
                        callback(null, comments);
                    }
                });
            }
        });
    }
}

module.exports = DAODestinations;