import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseUser } from '../firebase.types';
import { matchRoles } from '../firebase.utils';

@Injectable()
export class FirebaseRestRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    if (roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();

    const user: FirebaseUser = request.user;

    if (!user) {
      console.error(`User não existente na request`);
      return false;
    }

    const canAccess = matchRoles(roles, user);

    return canAccess;
  }
}
