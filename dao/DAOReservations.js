"use strict"

class DAOReservations {
    // --- Atributos ---
    pool; 
    
    // --- Constructor ---
    constructor(pool) {
        this.pool = pool;
    }

    // --- Métodos --- 
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
}

module.exports = DAOReservations;