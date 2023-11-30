-- Crear tablas

-- USUARIOS
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    foto BLOB
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

-- ITINERARIOS
INSERT INTO itinerario (n_dia, ciudad, descripción, id_destino) VALUES
(1,"Oviedo", "La capital de Asturias, conocida por su casco antiguo lleno de historia, su catedral gótica, sus parques y su deliciosa gastronomía.", 1),
(2,"Guijón", "Una ciudad costera con playas hermosas, un animado paseo marítimo, un casco antiguo encantador y una gran oferta cultural.", 1),
(3,"Cudillero", "Un pintoresco pueblo pesquero con casas de colores brillantes enclavadas en acantilados, calles estrechas y una tradición marinera que se siente en cada rincón.", 1),
(4,"LLanes", "Con sus impresionantes acantilados, playas espectaculares y un casco antiguo medieval, es un lugar perfecto para disfrutar del mar y la historia.", 1),
(5,"Ribadesella", "Ubicada en la desembocadura del río Sella, esta ciudad costera es famosa por su festival de piragüismo y sus hermosas playas.", 1),
(6,"Lastres", "Un encantador pueblo de pescadores que se extiende por una colina con vistas al mar, famoso por su belleza y por haber sido escenario de la serie de televisión española Doctor Mateo.", 1),
(7,"Cangas de Onís", "Conocido por su puente romano, símbolo de Asturias, y su ubicación estratégica en el Parque Nacional de los Picos de Europa, es un punto de partida ideal para explorar la naturaleza asturiana.", 1),

(1,"Barcelona", "La capital de la provincia y una ciudad famosa a nivel mundial. Es conocida por su arquitectura modernista, sus playas, su animada vida nocturna y sus sitios culturales, como la Sagrada Familia, el Parque Güell y Las Ramblas.", 2),
(2,"Sitges", "Ubicado en la costa, es conocido por sus playas, festivales, ambiente artístico y su vibrante vida nocturna. Es un destino popular tanto para turistas como para locales.", 2),
(3,"Tarragona", "Una ciudad antigua con un rico patrimonio histórico, especialmente en lo que respecta a su pasado romano. Cuenta con monumentos, ruinas y un anfiteatro romano bien conservado.", 2),
(4,"Sant Cugat del Vallès", "Un encantador pueblo cercano a Barcelona que ofrece un ambiente más tranquilo. Destaca por su monasterio, su casco antiguo y sus áreas naturales.", 2),
(5,"Terrassa", "Otra ciudad importante en la provincia, conocida por su patrimonio industrial, parques, museos y una interesante historia. Tiene una mezcla de elementos históricos y modernos.", 2),

(1,"Mitte", "El centro histórico de Berlín, donde se encuentran lugares icónicos como la Puerta de Brandeburgo y la Isla de los Museos.", 3),
(2,"Prenzlauer Berg", "Con calles arboladas, cafés bohemios y una mezcla de arquitectura histórica y moderna.", 3),
(3,"Friedrichshain", "Conocido por su ambiente alternativo, vida nocturna animada y el famoso puente Oberbaum.", 3),
(4,"Kreuzberg", "Un área multicultural con una rica historia, grafitis artísticos y una escena gastronómica diversa.", 3),
(5,"Neukölln", "Hogar de una comunidad internacional, con mercados, parques y una mezcla única de culturas.", 3),
(6,"Charlottenburg", "Ofrece elegancia y encanto con el Palacio de Charlottenburg y la avenida comercial Kurfürstendamm.", 3),
(7,"Schöneberg", "Conocido por su historia LGBT+, mercados tradicionales y parques pintorescos.", 3),
(8,"Wedding", "Un barrio diverso con una mezcla de culturas y una escena artística emergente.", 3),
(9,"Spandau", "Ofrece un ambiente más relajado, con un casco antiguo bien conservado y el Castillo de Spandau.", 3),
(10,"Tempelhof-Schöneberg", "Hogar del antiguo aeropuerto de Tempelhof, convertido en un parque urbano, y una mezcla de barrios residenciales y comerciales.", 3),

(1,"Río de Janeiro", "Famosa por sus playas icónicas como Copacabana e Ipanema, el Cristo Redentor y el Pan de Azúcar, Río de Janeiro es una ciudad vibrante y culturalmente rica.", 4),
(2,"São Paulo", "Es la ciudad más grande de Brasil y un importante centro financiero y cultural. Ofrece una escena artística y gastronómica diversa, así como una vida nocturna animada.", 4),
(3,"Salvador", "Conocida por su rica herencia afrobrasileña, Salvador es famosa por su música, danza y arquitectura colonial. El Pelourinho es su barrio histórico más destacado.", 4),
(4,"Brasilia", "Como capital de Brasil, Brasilia es famosa por su arquitectura modernista y su diseño urbano planificado, siendo considerada Patrimonio de la Humanidad por la UNESCO.", 4),
(5,"Manaus", "Ubicada en medio de la selva amazónica, Manaus es conocida por su Teatro Amazonas, una obra maestra arquitectónica y cultural.", 4),
(6,"Florianópolis", "Esta isla en el sur de Brasil es conocida por sus playas impresionantes y su ambiente relajado. Es un destino popular para los amantes del sol y el surf.", 4),
(7,"Ouro Preto", "Es una ciudad histórica en el estado de Minas Gerais, famosa por su arquitectura colonial, iglesias barrocas y su rica historia ligada a la minería de oro en el pasado.", 4),

(1,"Cádiz", "La ciudad capital de la provincia, conocida por su historia, sus playas y su encanto costero. Tiene una arquitectura impresionante y una rica cultura.", 5),
(2,"Jerez de la Frontera", "Famosa por el vino de Jerez (sherry), es una ciudad llena de tradición y flamenco. Además, alberga importantes bodegas y la Real Escuela Andaluza del Arte Ecuestre.", 5),
(3,"Chiclana de la Frontera", "Con sus largas playas de arena, es un destino popular para el turismo de sol y playa. Ofrece hermosos paisajes naturales y una rica oferta gastronómica.", 5),
(4,"Sanlúcar de Barrameda", "Situada en la desembocadura del río Guadalquivir, es conocida por sus mariscos, su cultura vinícola y las famosas carreras de caballos en la playa.", 5),
(5,"Tarifa", "Reconocida como el punto más meridional de la península ibérica, es famosa por sus playas y su ambiente relajado, además de ser un paraíso para los amantes del windsurf y el kitesurf.", 5),
(6,"Arcos de la Frontera", "Un pueblo blanco con una ubicación espectacular en la cima de un acantilado. Sus calles estrechas y su arquitectura histórica son encantadoras.", 5),
(7,"Vejer de la Frontera", "Otro pueblo blanco que ofrece vistas panorámicas y una mezcla única de arquitectura morisca y española. Sus calles empedradas son un placer para pasear.", 5),
(8,"El Puerto de Santa María", "Conocido por sus bodegas de vino y sus playas, este puerto tiene una rica historia que se puede explorar a través de sus monumentos y museos.", 5),

(1,"Las Palmas de Gran Canaria", "La capital de la isla de Gran Canaria, famosa por su animada vida urbana, playas y sitios de interés histórico como el barrio de Vegueta.", 6),
(2,"Santa Cruz de Tenerife", "Capital de la isla de Tenerife y una ciudad vibrante con una hermosa arquitectura, plazas encantadoras y el icónico carnaval de Santa Cruz, uno de los más grandes del mundo.", 6),
(3,"Puerto de la Cruz", "Un encantador pueblo costero en el norte de Tenerife, conocido por su belleza natural, como el Lago Martiánez y el Jardín Botánico.", 6),
(4,"Maspalomas", "Ubicado en el sur de Gran Canaria, famoso por sus extensas dunas de arena, playas impresionantes y una vida nocturna animada.", 6),
(5,"La Laguna", "Una ciudad histórica en Tenerife, declarada Patrimonio de la Humanidad por la UNESCO, conocida por su arquitectura colonial y sus calles empedradas.", 6),
(6,"Puerto de Mogán", "Un pintoresco pueblo pesquero en Gran Canaria, a menudo llamado Pequeña Venecia por sus canales y coloridas casas junto al mar.", 6),

(1,"Niza", "Niza es la ciudad más grande de la Costa Azul y un destino turístico popular. Con su famoso paseo marítimo, playas de guijarros, arquitectura elegante y una rica historia, Niza ofrece una combinación única de cultura, arte y vida nocturna vibrante.", 7),
(2,"Cannes", "Conocida por su famoso festival de cine, Cannes es una ciudad glamorosa y sofisticada. Además de sus lujosas boutiques y hoteles, Cannes alberga playas elegantes, restaurantes de alta gama y un encanto distintivo.", 7),
(3,"Mónaco", "Aunque es un principado independiente, Mónaco es un punto destacado en la Costa Azul. Famoso por su glamour, casinos, el Gran Premio de Fórmula 1 y sus paisajes escénicos, Mónaco atrae a visitantes en busca de lujo y entretenimiento.", 7),
(4,"Antibes", "Esta encantadora ciudad costera combina la belleza histórica con el encanto moderno. Antibes cuenta con un puerto animado, un casco antiguo pintoresco, museos interesantes y playas tranquilas que la convierten en un destino atractivo para los visitantes.", 7),
(5,"Villefranche-sur-Mer", "Este encantador pueblo pesquero cautiva con sus calles empedradas, coloridas fachadas y una bahía pintoresca. Es conocido por su ambiente tranquilo y sus aguas cristalinas que atraen a aquellos que buscan un ambiente más relajado en la Costa Azul.", 7),

(1,"Londres", "La capital del Reino Unido, conocida por su diversidad cultural, icónicos lugares turísticos como el Big Ben, el Palacio de Buckingham, el Museo Británico y mucho más.", 8),
(2,"Edimburgo", "La capital de Escocia, famosa por su historia, su arquitectura medieval y el imponente Castillo de Edimburgo. También es sede del famoso Festival de Edimburgo.", 8),
(3,"Bath", "Una ciudad en el suroeste de Inglaterra conocida por sus elegantes baños romanos, su arquitectura georgiana y su estatus como Patrimonio de la Humanidad por la UNESCO.", 8),
(4,"Oxford", "Hogar de la famosa Universidad de Oxford, esta ciudad histórica es conocida por su arquitectura universitaria, bibliotecas antiguas y su ambiente académico.", 8),
(5,"Cambridge", "Otra ciudad universitaria famosa por la Universidad de Cambridge y sus hermosos edificios históricos. Los paseos en barco por el río Cam son una actividad popular.", 8),
(6,"York", "Una ciudad amurallada con una rica historia vikinga y romana. Destacan la Catedral de York, el Shambles (un distrito medieval) y el Museo Nacional del Ferrocarril.", 8),
(7,"Belfast", "La capital de Irlanda del Norte, conocida por su pasado industrial y su vibrante escena cultural. Entre sus atracciones se encuentran el Titanic Belfast, el Ayuntamiento y los murales políticos.", 8),

(1,"Madrid", "La capital de España y de la Comunidad de Madrid, una ciudad vibrante con una rica historia, cultura, vida nocturna y una amplia oferta cultural y gastronómica.", 9),
(2,"Alcalá de Henares", "Reconocida por su universidad histórica y su centro histórico, es la ciudad natal de Miguel de Cervantes, autor de Don Quijote.", 9),
(3,"Aranjuez", "Famosa por su Palacio Real y sus hermosos jardines, que están declarados como Patrimonio de la Humanidad por la UNESCO.", 9),
(4,"Chinchón", "Conocido por su característica Plaza Mayor y sus casas con balcones de madera, es un encantador pueblo con encanto medieval.", 9),
(5,"San Lorenzo de El Escorial", "Hogar del imponente Monasterio de El Escorial, una obra maestra arquitectónica y lugar histórico importante.", 9),
(6,"Rascafría", "Ubicado en la Sierra de Guadarrama, es conocido por su entorno natural y el Monasterio de Santa María de El Paular.", 9),
(7,"Buitrago del Lozoya", "Un pintoresco pueblo amurallado con un rico patrimonio histórico y artístico, rodeado de un entorno natural privilegiado.", 9),
(8,"Navacerrada", "Una localidad en la Sierra de Guadarrama, famosa por su estación de esquí y senderos de montaña, ideal para actividades al aire libre.", 9),
(9,"Manzanares el Real", "Destacado por su impresionante castillo medieval, se encuentra en las estribaciones de la Sierra de Guadarrama, ofreciendo también oportunidades para el senderismo y la naturaleza.", 9),

(1,"Oslo", "La capital de Noruega, situada en el extremo norte del fiordo de Oslo, combina la vida urbana con la naturaleza y cuenta con museos, parques y una arquitectura fascinante.", 10),
(2,"Bergen", "Una ciudad portuaria famosa por su encantador casco antiguo, Bryggen, declarado Patrimonio de la Humanidad por la UNESCO, sus pintorescas casas de madera y el mercado de pescado.", 10),
(3,"Stavanger", "Conocida por su industria petrolera, esta ciudad ofrece hermosos paisajes naturales, como el famoso fiordo de Lysefjord y la roca Preikestolen (El Púlpito), una popular atracción turística.", 10),
(4,"Trondheim", "Una ciudad histórica con una rica historia vikinga, una catedral imponente y un ambiente estudiantil vibrante debido a su universidad.", 10),
(5,"Tromsø", "Conocida como la Puerta de entrada al Ártico, esta ciudad es ideal para avistar auroras boreales en invierno y ofrece actividades al aire libre y culturales durante todo el año.", 10),
(6,"Flåm", "Un pequeño pueblo situado en un impresionante entorno natural con montañas escarpadas, fiordos profundos y el famoso ferrocarril de Flåm, una de las rutas de tren más pintorescas del mundo.", 10),

(1,"Nueva York", "La ciudad de Nueva York es el centro urbano más grande del estado y uno de los más importantes del mundo. Conocida por sus icónicos rascacielos, distritos como Manhattan, Brooklyn, Queens y Staten Island, ofrece una rica diversidad cultural, desde museos de renombre hasta famosos puntos de interés como Times Square y Central Park.", 11),
(2,"Buffalo", "Situada al oeste de Nueva York, Buffalo es una ciudad importante, conocida por su arquitectura histórica, su arte y cultura, así como por estar cerca de las famosas Cataratas del Niágara.", 11),
(3,"Albany", "La capital del estado de Nueva York, Albany, está ubicada en la región noreste del estado. Es conocida por sus instituciones gubernamentales, museos y su conexión con la historia colonial de Estados Unidos.", 11),
(4,"Rochester", "Situada al norte de Nueva York, Rochester es reconocida por su legado industrial, así como por ser el lugar de nacimiento de empresas emblemáticas como Kodak y Xerox. También es conocida por su escena cultural y educativa.", 11),
(5,"Syracuse", "Esta ciudad central de Nueva York alberga importantes universidades y centros culturales. Además, es conocida por su historia en la industria manufacturera y su rica oferta artística.", 11),
(6,"Ithaca", "Ubicada en la región de Finger Lakes, Ithaca es conocida por ser el hogar de la Universidad Cornell y por su belleza natural, con cascadas, senderos para caminar y la impresionante garganta de Taughannock.", 11),
(7,"Montauk", "Montauk es una encantadora ciudad costera en Long Island, conocida por sus playas, faros, pesca y su ambiente relajado, lo que la convierte en un destino popular para los amantes del aire libre y los entusiastas del océano.", 11),

(1,"Montmartre", "Conocido por la icónica Basílica del Sagrado Corazón (Sacré-Cœur), Montmartre es un barrio bohemio famoso por su ambiente artístico, sus calles empedradas, sus cafés pintorescos y las vistas panorámicas de la ciudad desde la colina.", 12),
(2,"Le Marais", "Este barrio histórico es conocido por su arquitectura medieval, calles estrechas y edificios antiguos. Es un área animada con una mezcla de galerías de arte, boutiques de moda, restaurantes elegantes y una vibrante vida nocturna.", 12),
(3,"Saint-Germain-des-Prés", "Reconocido como un barrio intelectual y cultural, Saint-Germain-des-Prés alberga cafés históricos, librerías emblemáticas, galerías de arte y tiendas de diseño. Es un lugar ideal para explorar la bohemia parisina.", 12),
(4,"Champs-Élysées", "Esta famosa avenida es conocida por sus tiendas de lujo, teatros, restaurantes y monumentos icónicos como el Arco de Triunfo. Es un centro neurálgico para el turismo, la moda y el entretenimiento.", 12),
(5,"Île de la Cité", "Es el corazón histórico de París y alberga la Catedral de Notre Dame (actualmente en reconstrucción después del incendio), así como otros lugares emblemáticos como la Sainte-Chapelle y el Palacio de Justicia.", 12),

(1,"Tívoli", "Conocido por la Villa Adriana y la Villa d'Este, ambos sitios declarados Patrimonio de la Humanidad por la UNESCO, Tívoli alberga impresionantes villas, jardines y arquitectura histórica.", 13),
(2,"Ostia Antica", "Una antigua ciudad portuaria romana ubicada en las afueras de Roma, famosa por sus excavaciones arqueológicas que muestran los restos de antiguas calles, casas y baños públicos.", 13),
(3,"Frascati", "Conocido por sus viñedos y vinos blancos, Frascati es un encantador pueblo en las Colinas Albanas, ideal para disfrutar de la gastronomía local y las vistas panorámicas.", 13),
(4,"Castel Gandolfo", "Ubicado en la región de los Castelli Romani, este pintoresco pueblo es famoso por albergar la residencia de verano del Papa, con hermosos jardines y vistas al Lago Albano.", 13),
(5,"Viterbo", "Aunque no está exactamente en las afueras de Roma, Viterbo es una ciudad histórica con un centro medieval bien conservado y famosa por sus termas y balnearios.", 13),
(6,"Bracciano", "Situado en las afueras de Roma, es conocido por el Lago Bracciano y su castillo medieval, el Castello Orsini-Odescalchi, que ha sido escenario de bodas reales y famosos eventos.", 13),
(7,"Cerveteri", "Reconocido por su sitio arqueológico de la necrópolis etrusca de Banditaccia, que es uno de los sitios funerarios más grandes y mejor conservados del mundo etrusco.", 13),
(8,"Orvieto", "Aunque un poco más alejado de Roma, Orvieto es una ciudad encantadora conocida por su catedral gótica, su historia etrusca y sus cuevas subterráneas.", 13),

(1,"Florencia", "La capital de la Toscana y cuna del Renacimiento, es famosa por su arte, arquitectura y monumentos históricos como el Duomo, el Ponte Vecchio y la Galería Uffizi.", 14),
(2,"Siena", "Con su distintiva Plaza del Campo y la Catedral de Siena, esta ciudad medieval es conocida por su historia, arte y el famoso Palio, una carrera de caballos que tiene lugar dos veces al año.", 14),
(3,"Pisa", "Reconocida por la icónica Torre Inclinada de Pisa en la Plaza del Duomo, esta ciudad también alberga una catedral impresionante y un baptisterio.", 14),
(4,"Lucca", "Con sus murallas medievales intactas, esta ciudad ofrece un ambiente encantador y relajado. También es conocida por su arquitectura renacentista y calles adoquinadas.", 14),
(5,"San Gimignano", "Famoso por sus altas torres medievales, este pueblo amurallado es un tesoro histórico. Las torres ofrecen vistas panorámicas y su centro histórico es Patrimonio de la Humanidad por la UNESCO.", 14),
(6,"Arezzo", "Rica en historia y cultura, Arezzo es conocida por su arquitectura medieval, su anfiteatro romano y su hermosa basílica.", 14),
(7,"Montepulciano", "Ubicado en lo alto de una colina, este pueblo es conocido por su arquitectura renacentista, sus viñedos que producen el famoso vino Vino Nobile di Montepulciano y sus vistas panorámicas impresionantes.", 14),

(1,"Innere Stadt", "Es el corazón histórico de Viena y alberga muchos de los principales puntos de interés, como la Catedral de San Esteban, la Ópera Estatal de Viena, la Plaza del Ayuntamiento y la Biblioteca Nacional.", 15),
(2,"Schönbrunn", "Este es el sitio del magnífico Palacio Schönbrunn, una de las principales atracciones de Viena y declarado Patrimonio de la Humanidad por la UNESCO. Además del palacio, los extensos jardines y el zoológico (Tiergarten Schönbrunn) son lugares destacados.", 15),
(3,"Belvedere", "El Palacio Belvedere es un complejo barroco con dos palacios, el Alto Belvedere y el Bajo Belvedere, rodeados de hermosos jardines. Es conocido por albergar la Galería Austriaca Belvedere, que exhibe obras de artistas como Gustav Klimt y Egon Schiele.", 15),
(4,"Naschmarkt", "Este es uno de los mercados más antiguos y grandes de Viena. Ofrece una amplia gama de productos frescos, alimentos internacionales, cafeterías y restaurantes. Es un lugar popular tanto para los lugareños como para los turistas.", 15),
(5,"Prater", "Es un gran parque público que alberga la Rueda de la Fortuna (Riesenrad), un icono de Viena. Además de este famoso atractivo, el Prater ofrece amplias áreas verdes, caminos para pasear y una variedad de entretenimientos y atracciones.", 15),
(6,"Hofburg", "Este complejo palaciego es otro de los lugares destacados de Viena y fue la residencia de invierno de los Habsburgo durante siglos. Actualmente alberga la Biblioteca Nacional Austriaca, la Escuela de Equitación Española y el Museo Sisi, dedicado a la emperatriz Isabel de Austria.", 15);


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