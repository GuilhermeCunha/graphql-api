import { FirebaseUser } from './firebase.types';

export function matchRoles(roles: string[], user: FirebaseUser): boolean {
  return roles.some((role) =>
    user[role] === undefined ? false : user[role] === true,
  );
}
