import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../datarating/token/token.service';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles) {
      console.log('No roles required');
      return true;
    }
    const JWT = request.cookies['authorization']?.split(' ')[1]; // Bearer TOKEN
    console.log('JWT = ' + JWT);

    if (!JWT) throw new UnauthorizedException('No token provided');

    try {
      request.user = this.tokenService.verifyJWT(JWT);
      console.log();
      // Retrieve the required roles for the route
      const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

      // Check if the user's role matches any of the required roles
      const hasRole = requiredRoles.some((role) => request.user.role === role);
      if (!hasRole) {
        throw new UnauthorizedException('You do not have permission to access this resource');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token in RolesGuard');
    }
  }
}
