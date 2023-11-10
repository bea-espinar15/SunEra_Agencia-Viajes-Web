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

    // Leer reservas de un usuario
    readByUser(idUser, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let querySQLdest =  "SELECT * FROM destino JOIN (SELECT id_destino, MIN(id), img FROM Imagen GROUP BY id_destino)" + 
                                    "AS subquery2 ON destino.id = subquery2.id_destino ORDER BY valoración_media DESC";
                let querySQL = "SELECT reserva.*, subquery.id, subquery.nombre, subquery.país, subquery.img FROM reserva JOIN (" + querySQLdest +
                                ") AS subquery ON reserva.id_destino = subquery.id_destino WHERE id_usuario = ? ORDER BY fecha_ini DESC";

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
                                enabled: row.activo,
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