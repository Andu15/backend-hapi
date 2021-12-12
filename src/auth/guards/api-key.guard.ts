import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // creando la metadata isPublic
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    // contexto del request
    const request = context.switchToHttp().getRequest<Request>();

    // creando los headers
    const emailHeader = request.header('email');
    const pwdHeader = request.header('pwd');

    // asignando credenciales para permisos
    const authEmail = emailHeader === 'permission@imhapi.app';
    const authPwd = pwdHeader === '1@hapi_challenge';

    // condicional de los headers
    if (!authEmail && !authPwd) {
      throw new UnauthorizedException('not allow');
    }
    return true;
  }
}
