-- Crear tablas

-- USUARIOS
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    foto VARCHAR(255)
);

-- DESTINOS
CREATE TABLE destino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    descripción TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    aforo INT NOT NULL,
    valoración_media INT NOT NULL,
    país VARCHAR(255) NOT NULL,
    días INT NOT NULL
);

-- IMÁGENES
CREATE TABLE imagen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    id_destino INT NOT NULL,

    CONSTRAINT UC_Imagen UNIQUE(img, id_destino),
    FOREIGN KEY (id_destino) REFERENCES destino(id)
);

-- ITINERARIOS
CREATE TABLE itinerario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    n_dia INT NOT NULL,
    ciudad VARCHAR(255) NOT NULL,
    descripción TEXT,
    id_destino INT NOT NULL,

    CONSTRAINT UC_Itinerario UNIQUE(n_dia, id_destino),
    FOREIGN KEY (id_destino) REFERENCES destino(id)
);

-- RESERVAS
CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activo INT NOT NULL,
    fecha_ini DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    n_personas INT NOT NULL,
    id_usuario INT NOT NULL,
    id_destino INT NOT NULL,
    
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_destino) REFERENCES destino(id)
);

-- RESEÑAS
CREATE TABLE reseña (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valoracion INT NOT NULL,
    comentario TEXT,
    id_usuario INT NOT NULL,
    id_destino INT NOT NULL,

    CONSTRAINT UC_Reseña UNIQUE(id_usuario, id_destino, fecha),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_destino) REFERENCES destino(id)
);


-- Insertar datos de prueba

-- USUARIOS
INSERT INTO usuario (nombre, correo, nombre_usuario, contraseña) VALUES
('Usuario1', 'usuario1@email.com', 'user1', 'contraseña1'),
('Usuario2', 'usuario2@email.com', 'user2', 'contraseña2'),
('Usuario3', 'usuario3@email.com', 'user3', 'contraseña3'),
('Usuario4', 'usuario4@email.com', 'user4', 'contraseña4'),
('Usuario5', 'usuario5@email.com', 'user5', 'contraseña5');
('Usuario6', 'usuario6@email.com', 'a', 'a');

-- DESTINOS
INSERT INTO destino (nombre, descripción, precio, aforo, valoración_media, país, días) VALUES
('asturias', 'Descripción destino 1', 500.00, 100, 4, 'País 1', 7),
('barcelona', 'Descripción destino 2', 700.00, 200, 3, 'País 2', 5),
('berlín', 'Descripción destino 3', 600.00, 150, 5, 'País 3', 10),
('brasil', 'Descripción destino 4', 800.00, 250, 4, 'País 1', 7),
('cádiz', 'Descripción destino 5', 550.00, 120, 3, 'País 2', 8),
('canarias', 'Descripción destino 6', 450.00, 100, 5, 'País 3', 6),
('costa-azul', 'Descripción destino 7', 600.00, 170, 4, 'País 1', 5),
('londres', 'Descripción destino 8', 900.00, 300, 3, 'País 2', 7),
('madrid', 'Descripción destino 9', 750.00, 180, 5, 'País 3', 9),
('noruega', 'Descripción destino 10', 550.00, 140, 4, 'País 1', 6),
('nueva-york', 'Descripción destino 11', 600.00, 130, 3, 'País 2', 7),
('parís', 'Descripción destino 12', 500.00, 110, 5, 'País 3', 5),
('roma', 'Descripción destino 13', 650.00, 160, 4, 'País 1', 8),
('toscana', 'Descripción destino 14', 700.00, 220, 3, 'País 2', 7),
('viena', 'Descripción destino 15', 450.00, 100, 5, 'País 3', 6);

-- IMÁGENES
INSERT INTO imagen (img, id_destino) VALUES
("asturias.png", 1),
("asturias_2.png", 1),
("asturias_3.png", 1),
("barcelona.png", 2),
("barcelona_2.png", 2),
("barcelona_3.png", 2),
("berlín.png", 3),
("berlín_2.png", 3),
("berlín_3.png", 3),
("brasil.png", 4),
("brasil_2.png", 4),
("brasil_3.png", 4),
("cádiz.png", 5),
("cádiz_2.png", 5),
("cádiz_3.png", 5),
("canarias.png", 6),
("canarias_2.png", 6),
("canarias_3.png", 6),
("costa-azul.png", 7),
("costa-azul_2.png", 7),
("costa-azul_3.png", 7),
("londres.png", 8),
("londres_2.png", 8),
("londres_3.png", 8),
("madrid.png", 9),
("madrid_2.png", 9),
("madrid_3.png", 9),
("noruega.png", 10),
("noruega_2.png", 10),
("noruega_3.png", 10),
("nueva-york.png", 11),
("nueva-york_2.png", 11),
("nueva-york_3.png", 11),
("parís.png", 12),
("parís_2.png", 12),
("parís_3.png", 12),
("roma.png", 13),
("roma_2.png", 13),
("roma_3.png", 13),
("toscana.png", 14),
("toscana_2.png", 14),
("toscana_3.png", 14),
("viena.png", 15),
("viena_2.png", 15),
("viena_3.png", 15);


-- RESERVAS
INSERT INTO reserva (activo, fecha_ini, fecha_fin, precio_total, n_personas, id_usuario, id_destino) VALUES
(1, '2023-12-01', '2023-12-10', 2500.00, 2, 6, 1),
(1, '2023-11-15', '2023-11-22', 3500.00, 3, 6, 5),
(0, '2024-01-05', '2024-01-15', 4200.00, 4, 6, 7),
(1, '2023-10-01', '2023-10-08', 1800.00, 2, 6, 3),
(0, '2023-12-10', '2023-12-20', 2800.00, 3, 6, 6);

-- RESEÑAS
