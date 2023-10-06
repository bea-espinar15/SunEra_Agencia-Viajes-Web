# Proyecto Voluntario de Aplicaciones Web (2023-24)
## SunEra - Agencia de Viajes

### Autores
- Lucas Bravo Fairen
- Beatriz Espinar Aragón

### Estructura de carpetas
#### HTML
- account/ : En esta carpeta se encuentran las vistas relacionadas con la gestión de la cuenta del usuario (registro, inicio de sesión y visualización del perfil)
- fragments/ : En esta carpeta se encuentran el NAV y el FOOTER (fragmentos de la página web que son comunes a las demás vistas)
- general/ : En esta carpeta se encuentran las vistas principales de la página
#### Otras
- css/ : En esta carpeta se encuentran los ficheros CSS
    - account : aplicable al login y signup (que son distintas a todas las demás)
    - styles : estilos generales comunes a todas las vistas de la app
    - general : aplicable a los HTML incluidos en la carpeta general/
    - user : aplicable a user.html
- img/ : En esta carpeta se encuentran las imágenes utilizadas por la app. Dividida en subcarpetas según la naturaleza de las imágenes
- js/ : En esta carpeta se encuentran los ficheros JS. Para esta primera versión de la práctica, no hay ninguno
#### Documentación
Por último, tenemos la carpeta doc/, donde se encuentra toda la documentación utilizada en esta primera práctica. Esta consiste en:
- Modelo_Datos : Modelo que seguirá la BBDD, con las tablas y sus correspondientes atributos
- Modelo_Dominio : Modelo del dominio inicial con las entidades y sus atributos
- Diseño_SRS : Será la Especificación de Requisitos Software (SRS) conforme avance el proyecto. De momento, incluye un primer diseño inicial que se hizo de cada vista
- TO-DO : Lista de tareas realizada en Excel para facilitar la organización y reparto de tareas en el equipo

### Vistas
Las vistas que se han desarrollado para esta primera entrega de la práctica donde no se implementa ninguna funcionalidad son:
- sign_up : Registro de usuario
- login : Inicio de sesión del usuario
- index : Página inicial y principal de la app, permite buscar y filtrar destinos
- trending : Página donde se muestran todos los destinos, ordenados de mayor a menor valoración media
- about_us : "Quiénes somos", donde se explican algunas cuestiones de la agencia de viajes
- contact : Contiene preguntas frecuentes resueltas (FAQ) y la información de contacto
- user : Perfil del usuario, donde puede editar su información personal y gestionar sus reservas (actuales y pasadas)
- destination : Página de un destino concreto, donde se muestra la información detallada, así como los comentarios, y será desde donde el usuario realice la reserva

Además, se han elaborado los correspondientes nav y footer, que se importarán en los HTML cuando se explique en el temario de la asignatura