import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { FIREBASE_AUTH_GRAPHQL_STRATEGY_NAME } from './firebase-graphql.strategy';

@Injectable()
export class GraphQlAuthGuard extends AuthGuard(
  FIREBASE_AUTH_GRAPHQL_STRATEGY_NAME,
) {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
