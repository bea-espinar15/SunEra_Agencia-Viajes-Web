# Proyecto Voluntario de Aplicaciones Web (2023-24)
## SunEra - Agencia de Viajes

### Autores
- Lucas Bravo Fairen
- Beatriz Espinar Aragón

### Estructura de carpetas
#### Views
En esta carpeta se encuentran los ficheros EJS para las vistas dinámicas. En este caso, todas las vistas lo son, pues importan el <head> de manera dinámica (y la gran mayoría el <nav>). Las que realmente tienen contenido dinámico además de importar esos fragmentos son:
- destination.ejs
- error.ejs (para las páginas de errores tipo 404 o 500)
- index.ejs
- nav.ejs (por la foto de perfil del usuario, aunque todavía esta funcionalidad no está implementada)
- trending.ejs
- user.ejs
## TODO (si al final hacemos carpeta fragments)
#### Public
En esta carpeta se encuentran las vistas y los recursos estáticos. Incluye los siguientes elementos:
- head.html: Cabecera compartida por todos los HTML que se incluye de manera dinámica en los ficheros EJS
- css/ : En esta carpeta se encuentran los ficheros CSS
    - account : aplicable al login y signup (que son distintas a todas las demás)
    - styles : estilos generales comunes a todas las vistas de la app
    - general : aplicable a los HTML (EJS) principales de la aplicación (index, trending, about_us, contact y destination)
    - user : aplicable a user.ejs
    - error : aplicable a error.ejs (que es distinta a todas las demás)
- img/ : En esta carpeta se encuentran las imágenes utilizadas por la app. Dividida en subcarpetas según la naturaleza de las imágenes
## TODO
- js/ : En esta carpeta se encuentran los ficheros JS de cliente
### AS
En la carpeta as/ se encuentran los servicios de aplicación o AS (Application Service). Estos son los que se encargan de la capa de negocio, es decir, de implementar las funcionalidades que comprueban las reglas de negocio e invocar a los DAOs correspondientes. Implementamos un AS por cada módulo (destinos (que incluye también las reseñas), reservas y usuarios).
### DAO
En la carpeta dao/ se encuentran los DAO (Data Access Object), encargados de la capa de integración. Esto es, su trabajo es realizar las consultas a la Base de Datos. Implementan las funciones CRUD (Create Read Update Delete) necesarias en la aplicación. De nuevo, existe un DAO por cada módulo mencionado anteriormente.
### Otros ficheros
Contamos también con una serie de ficheros en la carpeta raíz:
- app.js : es el punto inicial de la aplicación, el MAIN. Este hace de manejador de rutas, crea el pool de conexiones, e invoca a los Application Service cada vez que se hace una petición, además de tener otras responsabilidades.
- config.js : contiene la configuración de la BBDD
- errorHandler.js : es el manejador de errores que transforma los códigos de error en un objeto error con el código correspondiente (400, 404, 500...), el título principal del error y el mensaje más elaborado de qué ha ocurrido
- import.sql : es el fichero script que debe introducirse en phpMyAdmin para crear la Base de Datos de la aplicación. Contiene los correspondientes CREATE TABLE, además de múltiples INSERT para añadir destinos a la BBDD así como datos de prueba para testear la aplicación
- Otros: se incluyen también la licencia software, los package.json del proyecto y este fichero READ.ME
#### Documentación
Por último, tenemos la carpeta doc/, donde se encuentra toda la documentación utilizada en esta primera práctica. Esta consiste en:
- Modelo_Datos : Modelo que seguirá la BBDD, con las tablas y sus correspondientes atributos
- Modelo_Dominio : Modelo del dominio inicial con las entidades y sus atributos
- Diseño_SRS : Es la Especificación de Requisitos Software (SRS). Incluye los diferentes casos de uso (con entrada/salida, requisitos...) y un diseño borrador inicial que se realizó de cada vista antes de implementarla
- TO-DO : Lista de tareas realizada en Excel para facilitar la organización y reparto de tareas en el equipo

### Vistas
Las vistas que existen en el proyecto son:
- sign_up : Registro de usuario
- login : Inicio de sesión del usuario
- index (/inicio) : Página inicial y principal de la app, permite buscar y filtrar destinos
- trending (/tendencias) : Página donde se muestran todos los destinos, ordenados de mayor a menor valoración media
- about_us (/quienes-somos) : "Quiénes somos", donde se explican algunas cuestiones de la agencia de viajes
- contact (/contacto) : Contiene preguntas frecuentes resueltas (FAQ) y la información de contacto
- user (/perfil) : Perfil del usuario, donde puede editar su información personal y gestionar sus reservas (actuales y pasadas)
- destination (/destino/:id) : Página de un destino concreto, donde se muestra la información detallada, así como los comentarios, y será desde donde el usuario realice la reserva
- error : Página de errores mayores (403, 404, 500) que no se gestionan en cliente con modales o alertas como se gestionan los clásicos 400

Además, se ha creado un fichero nav.ejs y footer.ejs para poder incluirse en los demás HTML y evitar la repetición de código. De igual manera se ha creado el card_destination.ejs, que representa la tarjeta de un destino, pues es utilizado tanto en index como en trending.

### Funcionalidades
Para esta segunda entrega de la práctica se han implementado las siguientes funcionalidades:
- SignUp: El usuario puede crearse una cuenta
- Login : El usuario puede iniciar sesión y, de no estar logeado, se le redirige a la página de login
- Logout : El usuario puede cerrar su sesión y volver a la página de login

Esto implica que han quedado sin implementar las siguientes funcionalidades:
## TODO