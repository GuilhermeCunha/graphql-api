import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { Module } from '@nestjs/common';
import { FirebaseAdminConfig } from 'src/config/FirebaseAdmin';
import { FirebaseStrategy } from './firebase.strategy';
import { FirebaseGraphQlStrategy } from './graphql/firebase-graphql.strategy';

const firebaseAdminModule = FirebaseAdminModule.forRootAsync({
  useFactory: () => FirebaseAdminConfig,
});
@Module({
  providers: [FirebaseStrategy, FirebaseGraphQlStrategy],
  imports: [firebaseAdminModule],
  exports: [firebaseAdminModule, FirebaseStrategy, FirebaseGraphQlStrategy],
})
export class FirebaseAuthModule {}
