import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  // @Get('authentication')
  // getAuth(): string {
  //   return 'API de autenticación con correo y contraseña';
  // }

  // METODO POST: API de registro de usuarios con los campos: correo, contraseña y nombre
  @Post('register')
  createRegister(
    @Body() userData: { name: string; email: string; password: any },
  ) {
    return {
      message: 'received',
      userData,
    };
  }

  // API de autenticación con correo y contraseña
}
