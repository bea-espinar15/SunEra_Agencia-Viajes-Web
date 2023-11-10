"use strict"

class DAOReservations {
    // --- Atributos ---
    pool; 
    
    // --- Constructor ---
    constructor(pool) {
        this.pool = pool;
    }

    // --- Métodos ---
    // Insertar reserva
    create(reservation, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "INSERT INTO reserva (activo, id_usuario, id_destino, fecha_ini, fecha_fin, precio_total, n_personas) VALUES (true, ?, ?, ?, ?, ?, ?)";

                connection.query(querySQL, 
                    [reservation.idUser, reservation.idDest, reservation.dateStart, reservation.dateEnd, reservation.totalPrice, reservation.nPeople], (error) => {
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
    
    // Leer reserva
    read(idRes, callback){
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "SELECT * FROM reserva WHERE id = ?";
                connection.query(querySQL, [idRes], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        // No existe
                        if (rows.length === 0) {
                            callback(-6);
                        }
                        // Error en la BBDD
                        else if (rows.length > 1) {
                            callback(-1);
                        }
                        else {
                            // Construir destino
                            let res = {
                                id: rows[0].id,
                                enabled: rows[0].activo,
                                idUser: rows[0].id_usuario,
                                idDes: rows[0].id_destino,
                                nPeople: rows[0].n_personas,
                                totalPrice: rows[0].precio_total,
                                dateStart: rows[0].fecha_ini,
                                dateEnd: rows[0].fecha_fin
                            }
                            callback(null, res);
                        }
                    }
                });
            }
        });
    }

    // Leer reservas de un usuario
    readByUser(idUser, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQLdest =  "SELECT * FROM destino JOIN (SELECT id_destino, MIN(id), img FROM Imagen GROUP BY id_destino)" + 
                                    "AS subquery2 ON destino.id = subquery2.id_destino ORDER BY valoración_media DESC";
                let querySQL = "SELECT reserva.*, subquery.nombre, subquery.país, subquery.img FROM reserva JOIN (" + querySQLdest +
                                ") AS subquery ON reserva.id_destino = subquery.id_destino WHERE id_usuario = ? AND activo = true ORDER BY fecha_ini DESC";

                connection.query(querySQL, [idUser], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        let reservations = new Array();
                        rows.forEach(row => {
                            let res = {
                                id: row.id,
                                dateStart: row.fecha_ini,
                                dateEnd: row.fecha_fin,
                                totalPrice: row.precio_total ,
                                nPeople: row.n_personas,
                                // Info del destino:
                                idDest: row.id_destino,
                                name: row.nombre,
                                country: row.país,
                                pic: row.img
                            }
                            reservations.push(res);
                        });
                        callback(null, reservations);
                    }
                });
            }
        });
    }

    // Dar de baja
    delete(id, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQL = "UPDATE reserva SET activo = false WHERE id = ?";
                connection.query(querySQL, [id], (error) => {
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

    // Obtener el número de plazas ocupadas en un destino durante unas fechas
    getBookedPlaces(idDest, dateStart, days, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let dateEnd = new Date();
                dateEnd.setDate(dateStart.getDate() + days);
                let querySQL = "SELECT SUM(n_personas) AS bookedPlaces FROM reserva WHERE id_destino = ? AND activo = true AND (fecha_ini BETWEEN ? AND ? OR fecha_fin BETWEEN ? AND ?)";

                connection.query(querySQL, [idDest, dateStart, dateEnd, dateStart, dateEnd], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        if (rows.length !== 1) {
                            callback(-1);
                        }
                        else {
                            callback(null, rows[0].bookedPlaces);
                        }                        
                    }
                });
            }
        });
    }
}

module.exports = DAOReservations;