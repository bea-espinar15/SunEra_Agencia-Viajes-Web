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
    valoración_media DECIMAL(10, 1) NOT NULL,
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
('Beatriz Espinar', 'beatrizespinar@gmail.com', 'bea_parker', '12345678'),
('Lucas Bravo', 'lucasbravo@gmail.com', 'luk_bravewalker', '12345678'),
('Jesús Cáceres', 'jesuscaceres@gmail.com', 'jcaceres8', '12345678'),
('Raquel Pérez', 'raquelperez@gmail.com', 'raquelWH', '12345678'),
('Antonio Navarro', 'antonionavarro@gmail.com', 'anavarro_dpcs', '12345678'),
('Gonzalo Pajares', 'gonzalopajares@gmail.com', '__gonpaj', '12345678'),
('Alberto Verdejo', 'albertoverdejo@gmail.com', 'alverdejo73', '12345678');

-- DESTINOS
INSERT INTO destino (nombre, descripción, precio, aforo, valoración_media, país, días) VALUES
('Conoce Asturias', 'Descubre la belleza natural de Asturias, España, durante este viaje de 7 días. Explora sus impresionantes paisajes, desde las majestuosas montañas de los Picos de Europa hasta las pintorescas playas de la costa norte.', 229.99, 100, 4.1, 'España', 7),
('Barcelona sagrada', 'Sumérgete en la esencia cultural de Barcelona, España, durante este viaje de 5 días. Visita emblemáticos lugares como la Sagrada Familia y disfruta de la combinación única de arquitectura modernista y ambiente vibrante de la ciudad.', 199.99, 200, 2.3, 'España', 5),
('Explora Berlín', 'Vive la historia y la modernidad en Berlín, Alemania, durante este viaje de 10 días. Explora los vestigios del Muro de Berlín, visita museos fascinantes y sumérgete en la energía cosmopolita de esta ciudad europea.', 674.99, 150, 0.9, 'Alemania', 10),
('Amazonas salvaje', 'Descubre la belleza natural del Amazonas en este viaje de 7 días a través de Brasil. Sumérgete en la exuberante selva, explora la diversidad de la flora y fauna, y experimenta la autenticidad de la vida selvática.', 869.99, 250, 3.9, 'Brasil', 7),
('Disfruta Cádiz', 'Explora la encantadora ciudad de Cádiz en este viaje de 8 días por España. Disfruta de las playas doradas, explora la rica historia de la ciudad, y sumérgete en la cultura vibrante de esta joya costera.', 544.99, 120, 3.7, 'España', 8),
('Visita Canarias', 'Embárcate en una aventura única de 6 días explorando las impresionantes Islas Canarias de España. Descubre paisajes volcánicos, playas de arena negra, y disfruta de un clima excepcional mientras exploras esta joya del Atlántico.', 419.99, 100, 1.1, 'España', 6),
('La Costa más azul', 'Explora la impresionante Costa Azul de Francia durante 5 días, disfrutando de playas de aguas cristalinas, pueblos encantadores y una rica cultura mediterránea.', 659.99, 170, 0.4, 'Francia', 5),
('Bretaña pura', 'Sumérgete en la autenticidad de Bretaña, en el Reino Unido, durante una semana. Descubre la belleza de sus paisajes, desde acantilados escarpados hasta encantadores pueblos costeros.', 909.99, 300, 2.5, 'Reino Unido', 7),
('Descubre Madrid', 'Embárcate en una emocionante aventura de 9 días para descubrir Madrid, la capital de España. Disfruta de su rica historia, arquitectura impresionante y la apasionante vida cultural que esta ciudad tiene para ofrecer.', 349.99, 180, 5, 'España', 9),
('Pasea por los fiordos', 'Explora la majestuosidad natural de Noruega durante 6 días, paseando por los impresionantes fiordos. Disfruta de la belleza escénica única mientras te sumerges en la tranquila serenidad del paisaje noruego.', 539.99, 140, 4.9, 'Noruega', 6),
('Vive Nueva York', 'Sumérgete en la energía vibrante de la ciudad que nunca duerme con el viaje "Vive Nueva York". Durante 7 días, descubre la diversidad cultural, los emblemáticos rascacielos y las experiencias inolvidables que esta metrópolis tiene para ofrecer.', 1859.99, 130, 3.2, 'Estados Unidos', 7),
('Viaje del amor', 'Embárcate en una escapada romántica de 5 días por Francia, explorando encantadores rincones parisinos, deleitándote con exquisita gastronomía y sumergiéndote en el ambiente romántico que envuelve a este icónico destino.', 499.99, 110, 2.5, 'Francia', 5),
('Roma auténtica', 'Descubre la autenticidad de Roma durante 8 días, explorando sus antiguas ruinas, sumergiéndote en la rica historia y disfrutando de la cocina italiana. Vive la eternidad de la Ciudad Eterna en esta experiencia única.', 469.99, 160, 4.1, 'Italia', 8),
('Viaje por la Toscana', 'Sumérgete en la belleza artística y culinaria de la región de la Toscana en Italia durante 7 días. Desde los campos de girasoles hasta las ciudades históricas, este viaje ofrece una experiencia inolvidable en uno de los destinos más pintorescos del mundo.', 149.99, 220, 1.7, 'Italia', 7),
('Viena Barroca', 'Experimenta la espléndida elegancia barroca de Viena durante 6 días. Desde los majestuosos palacios hasta la música clásica que llena el aire, este viaje te sumergirá en la rica cultura y la sofisticación de la capital austriaca.', 419.99, 100, 4.5, 'Austria', 6);


-- IMÁGENES
INSERT INTO imagen (img, id_destino) VALUES
("asturias_1.png", 1),
("asturias_2.png", 1),
("asturias_3.png", 1),
("barcelona_1.png", 2),
("barcelona_2.png", 2),
("barcelona_3.png", 2),
("berlín_1.png", 3),
("berlín_2.png", 3),
("berlín_3.png", 3),
("brasil_1.png", 4),
("brasil_2.png", 4),
("brasil_3.png", 4),
("cádiz_1.png", 5),
("cádiz_2.png", 5),
("cádiz_3.png", 5),
("canarias_1.png", 6),
("canarias_2.png", 6),
("canarias_3.png", 6),
("costa-azul_1.png", 7),
("costa-azul_2.png", 7),
("costa-azul_3.png", 7),
("londres_1.png", 8),
("londres_2.png", 8),
("londres_3.png", 8),
("madrid_1.png", 9),
("madrid_2.png", 9),
("madrid_3.png", 9),
("noruega_1.png", 10),
("noruega_2.png", 10),
("noruega_3.png", 10),
("nueva-york_1.png", 11),
("nueva-york_2.png", 11),
("nueva-york_3.png", 11),
("parís_1.png", 12),
("parís_2.png", 12),
("parís_3.png", 12),
("roma_1.png", 13),
("roma_2.png", 13),
("roma_3.png", 13),
("toscana_1.png", 14),
("toscana_2.png", 14),
("toscana_3.png", 14),
("viena_1.png", 15),
("viena_2.png", 15),
("viena_3.png", 15);


-- RESERVAS
INSERT INTO reserva (activo, fecha_ini, fecha_fin, precio_total, n_personas, id_usuario, id_destino) VALUES
(1, '2023-12-01', '2023-12-10', 459.98, 2, 1, 1),
(1, '2023-11-15', '2023-11-22', 1634.97, 3, 1, 5),
(0, '2024-01-05', '2024-01-15', 2639.96, 4, 1, 7),
(1, '2023-10-01', '2023-10-08', 1349.98, 2, 1, 3),
(0, '2023-12-10', '2023-12-20', 1259.97, 3, 1, 6);

(1, '2023-12-01', '2023-12-10', 459.98, 2, 2, 11),
(1, '2023-11-15', '2023-11-22', 1634.97, 3, 2, 3),
(1, '2024-01-05', '2024-01-15', 2639.96, 4, 2, 2),
(0, '2023-10-01', '2023-10-08', 1349.98, 2, 2, 4),
(1, '2023-12-10', '2023-12-20', 1259.97, 3, 3, 14);
(0, '2023-12-01', '2023-12-10', 459.98, 2, 3, 9),
(0, '2023-11-15', '2023-11-22', 1634.97, 3, 3, 10),
(1, '2024-01-05', '2024-01-15', 2639.96, 4, 3, 2),
(0, '2023-10-01', '2023-10-08', 1349.98, 2, 3, 13),
(1, '2023-12-10', '2023-12-20', 1259.97, 3, 3, 1);
(0, '2023-12-01', '2023-12-10', 459.98, 2, 4, 12),
(1, '2023-11-15', '2023-11-22', 1634.97, 3, 4, 4),
(0, '2024-01-05', '2024-01-15', 2639.96, 4, 4, 6),
(1, '2023-10-01', '2023-10-08', 1349.98, 2, 4, 8),
(0, '2023-12-10', '2023-12-20', 1259.97, 3, 4, 11);
(1, '2023-12-01', '2023-12-10', 459.98, 2, 5, 10),
(1, '2023-11-15', '2023-11-22', 1634.97, 3, 5, 9),
(0, '2024-01-05', '2024-01-15', 2639.96, 4, 5, 15),
(1, '2023-10-01', '2023-10-08', 1349.98, 2, 5, 15),
(0, '2023-12-10', '2023-12-20', 1259.97, 3, 5, 13);
(0, '2023-12-01', '2023-12-10', 459.98, 2, 6, 14),
(0, '2023-11-15', '2023-11-22', 1634.97, 3, 6, 2),
(0, '2024-01-05', '2024-01-15', 2639.96, 4, 6, 1),
(1, '2023-10-01', '2023-10-08', 1349.98, 2, 6, 3),
(0, '2023-12-10', '2023-12-20', 1259.97, 3, 6, 5);
(1, '2023-12-01', '2023-12-10', 459.98, 2, 6, 4),
(0, '2023-11-15', '2023-11-22', 1634.97, 3, 7, 8),
(1, '2024-01-05', '2024-01-15', 2639.96, 4, 7, 9),
(0, '2023-10-01', '2023-10-08', 1349.98, 2, 7, 2),
(1, '2023-12-10', '2023-12-20', 1259.97, 3, 7, 6);

1(229.99, 7),
2(199.99, 5),
3(674.99, 10),
4(869.99, 7),
5(544.99, 8),
6(419.99, 6),
7(659.99, 5),
8(909.99, 7),
9(349.99, 9),
10(539.99, 6),
11(1859.99, 7),
12(499.99, 5),
13(469.99, 8),
14(149.99, 7),
15(419.99, 6);




-- RESEÑAS
INSERT INTO reseña (fecha, valoracion, id_usuario, id_destino, comentario) VALUES
('2023-12-15', 5, 4, 14, 'Nuestro viaje por la Toscana fue simplemente perfecto. Desde las colinas ondulantes de la campiña toscana hasta las joyas culturales de Florencia, cada momento fue una delicia. Las degustaciones de vinos y la gastronomía local nos dejaron sin palabras. ¡No puedo esperar para volver!'),
('2023-04-23', 4.5, 5, 14, 'Recomiendo mucho la experiencia. Mi pareja y yo nos lo pasamos genial, repetimos seguro!');