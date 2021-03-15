import { applyDecorators, UseGuards } from '@nestjs/common';
import { FirebaseRestRolesGuard } from '../firebase-rest.roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { FirebaseAuthGuard } from '../../firebase-auth.guard';

export function FirebaseRestAuth(allowedRoles?: string[]): any {
  return applyDecorators(
    UseGuards(FirebaseAuthGuard, FirebaseRestRolesGuard),
    Roles(allowedRoles),
  );
}
