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
('Conoce Asturias', 'Descubre la belleza natural de Asturias, España, durante este viaje de 7 días. Explora sus impresionantes paisajes, desde las majestuosas montañas de los Picos de Europa hasta las pintorescas playas de la costa norte.', 229.99, 100, 0, 'España', 7),
('Barcelona sagrada', 'Sumérgete en la esencia cultural de Barcelona, España, durante este viaje de 5 días. Visita emblemáticos lugares como la Sagrada Familia y disfruta de la combinación única de arquitectura modernista y ambiente vibrante de la ciudad.', 199.99, 200, 4, 'España', 5),
('Explora Berlín', 'Vive la historia y la modernidad en Berlín, Alemania, durante este viaje de 10 días. Explora los vestigios del Muro de Berlín, visita museos fascinantes y sumérgete en la energía cosmopolita de esta ciudad europea.', 674.99, 150, 2.7, 'Alemania', 10),
('Amazonas salvaje', 'Descubre la belleza natural del Amazonas en este viaje de 7 días a través de Brasil. Sumérgete en la exuberante selva, explora la diversidad de la flora y fauna, y experimenta la autenticidad de la vida selvática.', 869.99, 250, 3.5, 'Brasil', 7),
('Disfruta Cádiz', 'Explora la encantadora ciudad de Cádiz en este viaje de 8 días por España. Disfruta de las playas doradas, explora la rica historia de la ciudad, y sumérgete en la cultura vibrante de esta joya costera.', 544.99, 120, 4, 'España', 8),
('Visita Canarias', 'Embárcate en una aventura única de 6 días explorando las impresionantes Islas Canarias de España. Descubre paisajes volcánicos, playas de arena negra, y disfruta de un clima excepcional mientras exploras esta joya del Atlántico.', 419.99, 100, 3, 'España', 6),
('La Costa más azul', 'Explora la impresionante Costa Azul de Francia durante 5 días, disfrutando de playas de aguas cristalinas, pueblos encantadores y una rica cultura mediterránea.', 659.99, 170, 4, 'Francia', 5),
('Bretaña pura', 'Sumérgete en la autenticidad de Bretaña, en el Reino Unido, durante una semana. Descubre la belleza de sus paisajes, desde acantilados escarpados hasta encantadores pueblos costeros.', 909.99, 300, 3.5, 'Reino Unido', 7),
('Descubre Madrid', 'Embárcate en una emocionante aventura de 9 días para descubrir Madrid, la capital de España. Disfruta de su rica historia, arquitectura impresionante y la apasionante vida cultural que esta ciudad tiene para ofrecer.', 349.99, 180, 4, 'España', 9),
('Pasea por los fiordos', 'Explora la majestuosidad natural de Noruega durante 6 días, paseando por los impresionantes fiordos. Disfruta de la belleza escénica única mientras te sumerges en la tranquila serenidad del paisaje noruego.', 539.99, 140, 4.5, 'Noruega', 6),
('Vive Nueva York', 'Sumérgete en la energía vibrante de la ciudad que nunca duerme con el viaje "Vive Nueva York". Durante 7 días, descubre la diversidad cultural, los emblemáticos rascacielos y las experiencias inolvidables que esta metrópolis tiene para ofrecer.', 1859.99, 130, 3, 'Estados Unidos', 7),
('Viaje del amor', 'Embárcate en una escapada romántica de 5 días por Francia, explorando encantadores rincones parisinos, deleitándote con exquisita gastronomía y sumergiéndote en el ambiente romántico que envuelve a este icónico destino.', 499.99, 110, 3, 'Francia', 5),
('Roma auténtica', 'Descubre la autenticidad de Roma durante 8 días, explorando sus antiguas ruinas, sumergiéndote en la rica historia y disfrutando de la cocina italiana. Vive la eternidad de la Ciudad Eterna en esta experiencia única.', 469.99, 160, 5, 'Italia', 8),
('Viaje por la Toscana', 'Sumérgete en la belleza artística y culinaria de la región de la Toscana en Italia durante 7 días. Desde los campos de girasoles hasta las ciudades históricas, este viaje ofrece una experiencia inolvidable en uno de los destinos más pintorescos del mundo.', 149.99, 220, 3.5, 'Italia', 7),
('Viena Barroca', 'Experimenta la espléndida elegancia barroca de Viena durante 6 días. Desde los majestuosos palacios hasta la música clásica que llena el aire, este viaje te sumergirá en la rica cultura y la sofisticación de la capital austriaca.', 419.99, 100, 0, 'Austria', 6);

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
(1, '2025-01-07', '2025-01-14', 459.98, 2, 1, 1),
(1, '2024-06-18', '2024-06-26', 1634.97, 3, 1, 5),
(1, '2021-11-04', '2021-11-09', 2639.96, 4, 1, 7),
(1, '2022-04-26', '2022-05-06', 1349.98, 2, 1, 3),
(1, '2023-09-15', '2023-09-21', 1259.97, 3, 1, 6),

(1, '2021-02-09', '2021-02-16', 1859.99, 1, 2, 11),
(1, '2022-07-12', '2022-07-22', 2699.96, 4, 2, 3),
(1, '2024-12-31', '2025-01-05', 799.96, 4, 2, 2),
(1, '2023-05-03', '2023-05-10', 6089.93, 7, 2, 4),

(1, '2021-10-22', '2021-10-29', 299.98, 2, 3, 14),
(1, '2022-03-08', '2022-03-17', 699.98, 2, 3, 9),
(1, '2023-08-16', '2023-08-22', 1619.97, 3, 3, 10),
(1, '2024-01-29', '2024-02-03', 799.96, 4, 3, 2),
(1, '2026-06-02', '2026-06-10', 2819.94, 6, 3, 13),
(1, '2025-11-14', '2025-11-21', 1149.95, 5, 3, 1),

(1, '2022-04-25', '2022-04-30', 499.99, 1, 4, 12),
(1, '2023-09-11', '2023-09-18', 6959.92, 8, 4, 4),
(1, '2024-02-19', '2024-02-25', 2099.95, 5, 4, 6),
(1, '2021-07-06', '2021-07-13', 6369.93, 7, 4, 8),
(1, '2025-12-30', '2025-01-06', 11159.94, 6, 4, 11),

(1, '2022-05-05', '2022-05-11', 1619.97, 3, 5, 10),
(1, '2021-10-27', '2021-11-05', 699.98, 2, 5, 9),
(1, '2024-03-10', '2024-03-16', 1679.96, 4, 5, 15),
(1, '2025-08-20', '2025-08-26', 1679.96, 4, 5, 15),
(1, '2023-01-01', '2023-01-09', 2349.95, 5, 5, 13),

(1, '2021-06-13', '2021-06-20', 899.94, 6, 6, 14),
(1, '2026-11-23', '2026-11-28', 1599.92, 8, 6, 2),
(1, '2024-04-17', '2024-04-24', 2069.91, 9, 6, 1),
(1, '2022-09-28', '2022-10-07', 4724.93, 7, 6, 3),
(1, '2023-02-21', '2023-03-01', 3269.94, 6, 6, 5),
(1, '2025-07-24', '2025-07-31', 1739.98, 2, 6, 4),

(1, '2021-12-07', '2021-12-14', 3639.96, 4, 7, 8),
(1, '2024-05-16', '2024-05-25', 699.98, 2, 7, 9),
(1, '2022-10-03', '2022-10-08', 199.99, 1, 7, 2),
(1, '2023-03-09', '2023-03-15', 1259.97, 3, 7, 6);

-- RESEÑAS
INSERT INTO reseña (fecha, valoracion, id_usuario, id_destino, comentario) VALUES
('2021-11-11', 4, 1, 7, 'La Costa Azul es simplemente impresionante. Aguas cristalinas, paisajes deslumbrantes y un ambiente que te roba el aliento. ¡Increíble experiencia!'),
('2022-05-07', 2, 1, 3, 'Berlín es una ciudad que respira historia en cada calle. La combinación de lo moderno y lo antiguo es un poco rara.'),
('2023-09-24', 3, 1, 6, 'Explorar los pueblos encantadores de las islas fue como dar un paso atrás en el tiempo.'),

('2021-02-17', 3, 2, 11, 'Let`s Go Knicks'),
('2022-07-24', 4, 2, 3, 'Me enamoré de la energía artística de Berlín. Cada rincón parece ser una obra de arte en sí mismo.'),
('2023-05-11', 3, 2, 4, 'La inmensidad del río Amazonas es abrumadora.'),

('2021-10-31', 4, 3, 14, 'Cada rincón de la Toscana es una obra maestra, desde la catedral de Florencia hasta los campos dorados de la campiña. Un sueño hecho realidad para cualquier amante de la belleza.'),
('2022-03-18', 3, 3, 9, '¡Increíble experiencia!'),
('2023-08-25', 4, 3, 10, 'La tranquilidad de los fiordos noruegos es casi mágica. Un escape perfecto de la rutina diaria.'),

('2022-05-02', 3, 4, 12, 'La Torre Eiffel iluminada por la noche es un espectáculo impresionante. París es un sueño hecho realidad.'),
('2023-09-19', 4, 4, 4, 'Explorar el Amazonas fue como entrar en un libro de aventuras. La flora y fauna son tan fascinantes que cada momento es inolvidable.'),
('2021-07-16', 3, 4, 8, 'Caminar por el Soho y descubrir cafés con tanta personalidad fue mi parte favorita. Londres tiene un encanto inigualable.'),

('2022-05-14', 5, 5, 10, 'No hay palabras para describir la majestuosidad de los fiordos noruegos. Un viaje que quedará grabado en mi memoria para siempre.'),
('2021-11-07', 5, 5, 9, 'Caminar por las bulliciosas calles de Madrid fue como sumergirse en un cuadro viviente. ¡Increíble experiencia!'),
('2023-01-11', 5, 5, 13, 'La pizza en Roma superó todas mis expectativas. Cada bocado era un pedazo de cielo italiano.'),

('2021-06-21', 3, 6, 14, 'La Toscana te abraza con su calidez, ya sea entre viñedos, en una trattoria local o al admirar el arte en Florencia. Un destino que toca todos los sentidos.'),
('2022-10-10', 2, 6, 3, 'La vida nocturna en Berlín es incomparable. Desde clubes underground hasta bares acogedores, la diversión nunca termina.'),
('2023-03-02', 4, 6, 5, 'Cádiz me robó el corazón.'),

('2021-12-16', 4, 7, 8, 'Las luces de la ciudad iluminando el Támesis crean un escenario mágico. Londres, ¡te extraño ya!'),
('2022-10-10', 4, 7, 2, 'Barcelona es una joya arquitectónica. Gaudí dejó su huella por toda la ciudad, ¡una experiencia visual impresionante!'),
('2023-03-18', 3, 7, 6, 'La comida canaria es un festín para el paladar. No puedo olvidar el sabor único de sus papas arrugadas y mojo.');