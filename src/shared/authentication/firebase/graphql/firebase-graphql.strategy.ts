import { ExecutionContext, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseAuthStrategy } from '../firebase.strategy';

export const FIREBASE_AUTH_GRAPHQL_STRATEGY_NAME =
  'FIREBASE_AUTH_GRAPHQL_STRATEGY';
@Injectable()
export class FirebaseGraphQlStrategy extends PassportStrategy(
  FirebaseAuthStrategy,
  FIREBASE_AUTH_GRAPHQL_STRATEGY_NAME,
) {
  constructor() {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
