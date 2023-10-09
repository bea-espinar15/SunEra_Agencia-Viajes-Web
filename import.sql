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
    img VARBINARY NOT NULL,
    id_destino INT NOT NULL REFERENCES destino(id),

    UNIQUE(img, id_destino)
);

-- ITINERARIOS
CREATE TABLE itinerario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    n_dia INT NOT NULL,
    ciudad VARCHAR(255) NOT NULL,
    descripción TEXT,
    id_destino INT NOT NULL REFERENCES destino(id),

    UNIQUE(n_dia, id_destino)
);

-- RESERVAS
CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activo INT NOT NULL,
    fecha_ini DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    n_personas INT NOT NULL,
    id_usuario INT NOT NULL REFERENCES usuario(id),
    id_destino INT NOT NULL REFERENCES destino(id)
);

-- RESEÑAS
CREATE TABLE reseñas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valoracion INT NOT NULL,
    comentario TEXT,
    id_usuario INT NOT NULL REFERENCES usuario(id),
    id_destino INT NOT NULL REFERENCES destino(id),

    UNIQUE(id_usuario, id_destino, fecha)
);