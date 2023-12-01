# Proyecto Voluntario de Aplicaciones Web (2023-24)
## SunEra - Agencia de Viajes

### Autores
- Lucas Bravo Fairen
- Beatriz Espinar Aragón

### Estructura de carpetas
#### VIEWS
En esta carpeta se encuentran los ficheros EJS para las vistas dinámicas. En este caso, todas las vistas lo son, pues importan el <head> de manera dinámica (y la gran mayoría el nav>). Las que realmente tienen contenido dinámico además de importar esos fragmentos son:
- destination.ejs
- error.ejs (para las páginas de errores tipo 404 o 500)
- index.ejs
- nav.ejs (por la foto de perfil del usuario, aunque todavía esta funcionalidad no está implementada)
- trending.ejs
- user.ejs

Además, los fragmentos HTML que se importan en otros lugares de código se incluyen dentro de la subcarpeta fragments/
#### PUBLIC
En esta carpeta se encuentran las vistas y los recursos estáticos. Incluye los siguientes elementos:
- head.html: Cabecera compartida por todos los HTML que se incluye de manera dinámica en los ficheros EJS
- css/ : En esta carpeta se encuentran los ficheros CSS
    - account : aplicable al login y signup (que son distintas a todas las demás)
    - styles : estilos generales comunes a todas las vistas de la app
    - general : aplicable a los HTML (EJS) principales de la aplicación (index, trending, about_us, contact y destination)
    - user : aplicable a user.ejs
    - error : aplicable a error.ejs (que es distinta a todas las demás)
- img/ : En esta carpeta se encuentran las imágenes utilizadas por la app. Dividida en subcarpetas según la naturaleza de las imágenes
- js/ : En esta carpeta se encuentran los ficheros JS de cliente
    - account : JS que valida los formularios de registro de usuario e inicio de sesión
    - destination : JS que valida el formulario de reserva y el formulario de hacer una reseña, y que manipula el DOM para mostrar los itinerarios
    - index : JS que manipula el DOM para mostrar el filtro de precio seleccionado
    - user : JS que valida los formularios de editar perfil y cambiar contraseña

#### SERVIDOR
__AS__

En la carpeta as/ se encuentran los servicios de aplicación o AS (Application Service). Estos son los que se encargan de la capa de negocio, es decir, de implementar las funcionalidades que comprueban las reglas de negocio e invocar a los DAOs correspondientes. Implementamos un AS por cada módulo (destinos (que incluye también las reseñas), reservas y usuarios).

__DAO__

En la carpeta dao/ se encuentran los DAO (Data Access Object), encargados de la capa de integración. Esto es, su trabajo es realizar las consultas a la Base de Datos. Implementan las funciones CRUD (Create Read Update Delete) necesarias en la aplicación, y alguna otra adicional. De nuevo, existe un DAO por cada módulo mencionado anteriormente.

__Otros ficheros JS__

Contamos también con una serie de ficheros en la carpeta raíz:
- app.js : es el punto inicial de la aplicación, el MAIN. Este hace de manejador de rutas, crea el pool de conexiones, e invoca a los Application Service cada vez que se hace una petición, además de tener otras responsabilidades.
- config.js : contiene la configuración de la BBDD
- responseHandler.js : es el manejador de mensajes de respuesta (error o confirmación) que transforma los códigos en un objeto response con el código correspondiente (200, 400, 404, 500...), el título principal del evento y el mensaje más elaborado de qué ha ocurrido
- utils.js : exporta dos funciones auxiliares utilizadas desde los AS

#### OTROS
Existen otros ficheros en la carpeta raíz del proyecto:
- import.sql : es el fichero script que debe introducirse en phpMyAdmin para crear la Base de Datos de la aplicación. Contiene los correspondientes CREATE TABLE, además de múltiples INSERT para añadir destinos a la BBDD así como datos de prueba para testear la aplicación
- Otros: se incluyen también la licencia software, los package.json del proyecto y este fichero README.md
#### DOCUMENTACIÓN
Por último, tenemos la carpeta doc/, donde se encuentra toda la documentación utilizada en la práctica. Consiste en:
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
- destination (/destino/:id) : Página de un destino concreto, donde se muestra la información detallada y los itinerarios, así como los comentarios, y será desde donde el usuario realice la reserva y haga su reseña
- error : Página de errores mayores (403, 404, 500) que no se gestionan en cliente con modales o alertas como se gestionan los clásicos 400

Además, se ha creado un fichero nav.ejs y footer.ejs para poder incluirse en los demás HTML y evitar la repetición de código. De igual manera se ha creado el card_destination.ejs, que representa la tarjeta de un destino, pues es utilizado tanto en index como en trending. Por último, el modal.ejs representa los modales donde se muestran los mensajes de confirmación o error, y que se muestran en las distintas vistas cuando se hace una petición POST.

### Funcionalidades
Actualmente están implementadas las siguientes funcionalidades:
- SignUp: El usuario puede crearse una cuenta
- Login : El usuario puede iniciar sesión y, de no estar logeado, se le redirige a la página de login
- Logout : El usuario puede cerrar su sesión y volver a la página de login
- Book : El usuario puede hacer una reserva de un destino, y esta se mostrará en su perfil con las demás reservas
- Cancel : El usuario puede cancelar una reserva que aún no haya sucedido
- EditProfile : El usuario puede modificar sus datos personales
- ChangePass : El usuario puede modificar su contraseña
- Search : El usuario puede buscar un destino en la página de Inicio (se buscan coincidencias en el nombre, la descripción y el país del destino)
- Filter : El usuario puede filtrar los destinos según una serie de parámetros, y ver qué filtros hay aplicados en cada momento
- Comment : El usuario puede hacer 1 comentario/reseña por cada destino (AJAX)
- Foto de perfil : El usuario puede establecer su propia foto de perfil