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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
=======
# Backend HAPI
Este proyecto esta construido sobre nestJS, para crear una imagen he utilizado Docker expuesto en el puerto 3000, Insomnia para la simulación de peticiones de frontend, para la autenticación estoy usando Passport y JWT

## Descripción del reto
La prueba consiste en hacer solo un backend SIN UI (frontend) que exponga servicios para las
siguientes funcionalidades:
- API de registro de usuarios con los campos: correo, contraseña y nombre
- API de autenticación con correo y contraseña
- API de creación de posts con los campos de título, descripción e imagen estando el
usuario ya autenticado
- API de listado de posts
- API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado
- API que permita, al usuario autenticado, votar o quitar el voto dado a un post
# Requisitos

- Instalación de nestJS
- Instalación de mongoDB como base de datos
- Instalación de Passport
- - Instalación de JWT
## Pasos para crear este proyecto
1. Averiguar las bases de nestJS para la preparación del entorno
2. Definir los tipos de controllers: uno para users y otro para posts para dividir responsabilidades
3. Crear métodos dentro de cada controller con ayuda de los decoradores y definiendo las rutas de las peticiones
4. Crear una máquina virtual con Docker junto con mongoDB
5. Crear directorios con el CLI: 
   - dto: aquí reside los datos que se aceptaran y su tipado
   - controllers: es donde se colocan las rutas y servicios(en este caso mongoDB) que se estan llamando con los métodos de get, post, delete, put, etc
   - services: son los famosos ejecutables de parte del servicio (en este caso mongo), donde se le indica los tipos de datos que recibira y el modelo(los schemas)
   - modules: es como el indice, recoge todos los modulos de la api, librerias, controllers, services, schemas y es llamado desde el import en `app.module.ts` 
   - schemas: propio del servicio, indica la estructura que recibira el servicio
6. Luego de construir la estructura inicial, pasar a la etapa de autenticación, para ello creo la carpeta `interfaces` donde existe una clase extendida del documento de mongoDB
7. Para el tema de autenticacion, usare [Passport](https://github.com/jaredhanson/passport) y [JWT](https://jwt.io/)
8. Creo un módulo indepeniente para auth con `nest g mo modules/auth --flat` y también necesito un guardian para proteger las peticiones y lo creo con `nest g gu guard/apiKey --flat`
9. Dentro del archivo `api-key.guards.ts` configuro los Headers que va a recibir dentro del contexto del request, en este caso es necesario enviarle un Auth con su valor '1234' para tener acceso