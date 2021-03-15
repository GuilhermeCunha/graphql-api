import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseUser } from '../firebase.types';
import { matchRoles } from '../firebase.utils';

@Injectable()
export class FirebaseGraphQlRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    if (roles.length === 0) return true;

    const request = ctx.getContext().req;

    const user: FirebaseUser = request.user;

    if (!user) {
      console.error(`User não existente na request`);
      return false;
    }

    const canAccess = matchRoles(roles, user);

    return canAccess;
  }
}
