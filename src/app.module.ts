import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import modules from './api/modules';
import { AuthenticationModule } from './shared/authentication/authentication.module';
import { GupshupService } from './gupshup/gupshup.service';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forRoot('mongodb://localhost:27017/graphql-api', {
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      context: ({ req }) => ({ req }),
    }),
    ...modules,
  ],
  controllers: [],
  providers: [AuthenticationModule, GupshupService],
})
export class AppModule {}
