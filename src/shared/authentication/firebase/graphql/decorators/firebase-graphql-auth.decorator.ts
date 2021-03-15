import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { GraphQlAuthGuard } from '../firebase-graphql-auth.guard';
import { FirebaseGraphQlRolesGuard } from '../firebase-graphql.roles.guard';

export function FirebaseGraphQlAuth(allowedRoles?: string[]): any {
  return applyDecorators(
    UseGuards(GraphQlAuthGuard, FirebaseGraphQlRolesGuard),
    Roles(allowedRoles),
  );
}
