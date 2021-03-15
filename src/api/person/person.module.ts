import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Person, PersonSchema } from '../../mongoose/schemas/person.schema';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}
