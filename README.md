<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Backend HAPI

## Introducción
Contrucción de API's para el registro de usuarios (dto: email, password y name), autenticación con correo y contraseña, creación de posts (dto: title, description, image, like) cuando el usuario esta autenticado, lista de posts(publico), eliminar los post de un usuario cuando el usuario esta autenticado (queda pendiente que le pertenezca el post) y agregar o quitar like a un post cuando el usuario esta autenticado

## Importante
- Puerto: 3000
- Se ha creado una imagen a través de Docker
- mongoDB como base de datos
# Requisitos
- Instalación de nestJS
- Instalación de Passport
- Instalación de JWT
- Instalación de bcrypt
## Pasos para crear este proyecto
1. Preparar el entorno con el cli de NestJS `npm i -g @nestjs/cli` e iniciarlo con `nest new <project-name>` e iniciar el servidor con `npm run start:dev`

2. Para la base de datos (mongoDB) se crea una imagen cuya configuración esta en el :file_folder:	`Dockerfile` y luego se crea el archivo :file_folder:	`docker-compose.yml` donde recopilaremos los servicios que levantaremos (para docker: nest-app en el puerto 3000 y para mongo en el puerto 27017). Luego configuramos y levantamos la imagen `docker-compose up -d mongo`;
   
3. Para comprobar las collecciones de la base de datos, será con la ayuda de `Robo 3T` que ya debería estar instalado en el pc.

4. Una vez que tengamos todo lo anterior, tenemos que empezar a estructurar nuestro proyecto, en este caso, dentro de src creare los directorios :card_index_dividers: `auth` para todo el tema de login(autenticación), :card_index_dividers: `posts` para almacenar los posts y sus métodos y un directorio :card_index_dividers: `users` para almacenar los inputs de los nuevos usuarios.

5. Luego nos enfocaremos en crear las subcarpetas y archivos que necesitamos para posts y users, en este caso sería en el sgte:
   - `<name>`.module.ts que actuara como el índice de cada API, aqui se importara los controllers, providers (o servicios), schemas, y todo lo relacionado o que se requiera en la construcción de la API.
   - `<name>`.dto.ts para saber el tipo de variables que se estaban compartiendo desde el frontend al backend
   - `<name>`.controller.ts que se encargan de recibir los requests(peticiones o solicitud del frontend al backend) de la aplicación, que almacenará los métodos y sus operaciones(get, post, patch, delete) y se encargara de validar los tipos, guardianes, decoradores, etc. y si todo es correcto se conectará a uno o varios servicios.
   - `<name>`.service.ts que esta relacionado con la base datos y sirve para inyectar su información y son algo que se suele usar desde varios modulos y con cada inyección tiene un constructor
   - `<name>`.schema.ts o llamada entidad, aqui especificamos los tipos de datos que recibiremos por parte del servicio, y es muy similar al dto del frontend
   - `<name>`.interface.ts o llamadas firmas, basicamente para definir los atributos y métodos de una «cosa», sin importar qué sea esa cosa, mejor dicho para definir tipos de clases sin distinguir entre ellas.

6. Para el tema de autenticacion, usare [Passport](https://github.com/jaredhanson/passport) y [JWT](https://jwt.io/) pero para evitar tener información sensible encriptaremos el password del user con bcrypt;
   
7. Es importante crear un módulo indepeniente para auth con `nest g mo modules/auth --flat` y también necesito un guardian para proteger las peticiones y lo creo con `nest g gu guard/apiKey --flat`

8.  Dentro del archivo `api-key.guards.ts` configuro los Headers que va a recibir dentro del contexto del request, en este caso es necesario enviarle en el header los sgtes argumentos:   
   <code>email: permission@imhapi.app  
   pwd: 1@hapi_challenge`</code>
con excepción de la API de listado de posts que es público
   
9.  Con la ayuda de `@SetMetadata` se crea el decorador `@Public` para crear una variable junto con su entorno y sus condicionales se encuentran en el archivo de `api-key.guard.ts` 

10.  Se crean archivos con formato `<name>.strategy.ts` que convierte un grupo de comportamientos en objetos y los hace intercambiables dentro del objeto de contexto original

11. Finalmente, hago uso de los guardinaes y estrategias para proteger ciertos métodos y su peticiones

## Descripción de API's
* API de registro de usuarios con los campos: correo, contraseña y nombre
  - Operación: Post
  - Para crear un registro, se manejará un endpoint `http://localhost:3000/users`
  - Recibirá 3 inputs: "name", "email" y "password"

* API de autenticación con correo y contraseña
  - Operación: Post
  - Para crear un registro, se manejará un endpoint `http://localhost:3000/auth/login`
  - Aceptará 2 inputs(de los cuales debe haber un registro previo): "email" y "password"
  - De no existir un registro debe indicar "Not allow"

* API de creación de posts con los campos de título, descripción e imagen estando el
usuario ya autenticado
  - Operación: Post
  - Para crear un registro, se manejará un endpoint `http://localhost:3000/posts`
  - Aceptará 4 inputs: "title", "description", "image", "like" (boolean)
  - Dentro de Auth, debe indicar el token generado con JWT
  - En el header indicar:
    <code>email: permission@imhapi.app  
   pwd: 1@hapi_challenge`</code>

* API de listado de posts
  - Operación: Get
  - Para crear un registro, se manejará un endpoint `http://localhost:3000/posts`
  - Es publico, no necesita permisos

* API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado
  - Operación: Delete
  - Para crear un registro, se manejará un endpoint `http://localhost:3000/posts/:id`
  - Dentro de Auth, debe indicar el token generado con JWT
  - En el header indicar:
    <code>email: permission@imhapi.app  
   pwd: 1@hapi_challenge`</code>
  - **OJO : Queda pendiente la condición de que el post le pertenezca para realizar la operación**

* API que permita, al usuario autenticado, votar o quitar el voto dado a un post
  - Operación: Patch
  - Para crear un registro, se manejará un endpoint `http://localhost:3000/posts/:id`
  - En el body, en formato JSON, indicar el valor de "like", solo acepta "true" o "false"
  - Dentro de Auth, debe indicar el token generado con JWT
  - En el header indicar:
    <code>email: permission@imhapi.app  
   pwd: 1@hapi_challenge`</code>
## Autor
[Andrea Blanco] (https://github.com/Andu15)

## TimeLine
- Inicio: Viernes 10/12/2021
- Fin: Lunes 13/12/2021




