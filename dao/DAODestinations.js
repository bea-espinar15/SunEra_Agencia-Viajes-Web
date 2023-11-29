"use strict"

const utils = require("../utils");

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
                callback(-1);
            }
            else {
                let querySQL = "SELECT * FROM destino WHERE id = ?";
                connection.query(querySQL, [idDest], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        // No existe el destino
                        if (rows.length === 0) {
                            callback(-3)
                        }
                        // Error en la BBDD, IDs duplicados
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
                callback(-1);
            }
            else {
                let querySQL = "SELECT * FROM imagen WHERE id_destino = ? ORDER BY id ASC";
                connection.query(querySQL, [idDest], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        // Quedarse sólo con la ruta (lo demás no hace falta)
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
                callback(-1);
            }
            else {
                // Hay que traerse el destino y también su imagen principal (la que tenga el ID más pequeño)
                let querySQL = "SELECT * FROM destino JOIN (SELECT id_destino, MIN(id), img FROM Imagen GROUP BY id_destino)" + 
                               "AS subquery ON destino.id = subquery.id_destino ORDER BY valoración_media DESC";
                connection.query(querySQL, (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        let destinations = new Array();
                        rows.forEach(row => {
                            // Construir cada destino
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
                callback(-1);
            }
            else {
                // Cogemos también el nombre_usuario para no tener que llamar a daoUser.read()
                let querySQL = "SELECT reseña.*, usuario.nombre_usuario AS username FROM reseña JOIN usuario ON reseña.id_usuario = usuario.id WHERE id_destino = ? ORDER BY fecha DESC";
                connection.query(querySQL, [idDest], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        let comments = new Array();
                        rows.forEach(row => {
                            // Reconstruimos cada comentario
                            let comment = {
                                 username: row.username,
                                 rate: row.valoracion,
                                 text: row.comentario,
                                 date: utils.formatDate(row.fecha)
                            }
                            comments.push(comment);
                        });
                        callback(null, comments);
                    }
                });
            }
        });
    }

    // Leer el comentario de un usuario
    readCommentByUser(idDest, idUser, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                // Cogemos también el nombre_usuario para no tener que llamar a daoUser.read()
                let querySQL = "SELECT * FROM reseña WHERE id_destino = ? AND id_usuario = ?";
                connection.query(querySQL, [idDest, idUser], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        console.log(rows)
                        if(rows.length === 0){
                            callback(null, true);
                        }
                        else{
                            callback(null, false);
                        }
                    }
                });
            }
        });
    }

    // Buscar destinos que coincidan con un texto de entrada
    search(searchQuery, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let input = "%" + searchQuery + "%";
                // Hay que traerse el destino y también su imagen principal (la que tenga el ID más pequeño)
                let querySQL = "SELECT * FROM destino JOIN (SELECT id_destino, MIN(id), img FROM Imagen GROUP BY id_destino)" + 
                               "AS subquery ON destino.id = subquery.id_destino WHERE nombre LIKE ? OR descripción LIKE ? OR país LIKE ?";
                connection.query(querySQL, [input, input, input], (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        let destinations = new Array();
                        rows.forEach(row => {
                            // Construir cada destino
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

    // Aplicar filtros
    filter(params, callback) {
        this.pool.getConnection((error, connection) => {
            if (error) {
                callback(-1);
            }
            else {
                let input = new Array();
                let where = "";
                // Construir condiciones
                let res = DAODestinations.buildQuery(input, params.days, where)
                if (res[0]) {
                    where = where + res[1] + "días <= ?";
                }
                res = DAODestinations.buildQuery(input, params.nPeople, where)
                if (res[0]) {
                    where = where + res[1] + "aforo >= ?";
                }
                res = DAODestinations.buildQuery(input, params.price, where)
                if (res[0]) {
                    where = where + res[1] + "precio <= ?";
                }
                res = DAODestinations.buildQuery(input, params.rate, where)
                if (res[0]) {
                    where = where + res[1] + "valoración_media >= ?";
                }

                // Hay que traerse el destino y también su imagen principal (la que tenga el ID más pequeño)
                console.log(`Hola soy el where: ${where}`);
                let querySQL = "SELECT * FROM destino JOIN (SELECT id_destino, MIN(id), img FROM Imagen GROUP BY id_destino)" + 
                               "AS subquery ON destino.id = subquery.id_destino" + where;
                connection.query(querySQL, input, (error, rows) => {
                    connection.release();
                    if (error) {
                        callback(-1);
                    }
                    else {
                        let destinations = new Array();
                        rows.forEach(row => {
                            // Construir cada destino
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

    // Constuir WHERE del filter
    static buildQuery(input, param, where) {
        if (param) {
            input.push(param);
            if (where === "") {
                return [true, " WHERE "];
            }
            if (where === " WHERE ") {
                return [true, ""];
            }
            else {
                return [true, "AND "];
            }
        }
        else {
            return [false, ""];
        }        
    }
}

module.exports = DAODestinations;