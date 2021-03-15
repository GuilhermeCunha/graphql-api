import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FIREBASE_AUTH_STRATEGY_NAME } from './firebase.strategy';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(FIREBASE_AUTH_STRATEGY_NAME) {}
