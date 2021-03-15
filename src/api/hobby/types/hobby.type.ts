import { Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Hobby } from 'src/mongoose/schemas/hobby.schema';

@ObjectType()
export class HobbyType extends Hobby {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  name: string;
}
