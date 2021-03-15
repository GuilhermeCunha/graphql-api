import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { HobbyType } from 'src/api/hobby/types/hobby.type';
import { Hobby } from 'src/mongoose/schemas/hobby.schema';
import { Person } from 'src/mongoose/schemas/person.schema';

@ObjectType()
export class PersonType extends Person {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => [HobbyType])
  hobbies: Types.ObjectId[] | Hobby[];
}
