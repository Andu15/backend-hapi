import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'este es el home';
  }

  @Get('users/register')
  userRegister(): string {
    return 'API de registro de usuarios con los campos: correo, contraseña y nombre';
  }

  @Get('users/authentication')
  userAuth(): string {
    return 'API de autenticación con correo y contraseña';
  }

  @Get('posts/create')
  newPost(): string {
    return 'API de creación de posts con los campos de título, descripción e imagen estando el usuario ya autenticado';
  }

  @Get('posts/list')
  listPosts(): string {
    return 'API de listado de posts';
  }

  @Get('posts/delete')
  deletePost(): string {
    return 'API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado';
  }

  @Get('posts/likes')
  likePost(): string {
    return 'API que permita, al usuario autenticado, votar o quitar el voto dado a un post';
  }
}
