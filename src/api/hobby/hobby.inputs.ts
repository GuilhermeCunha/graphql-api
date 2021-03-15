import { Types } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';
import { SortsType } from 'src/shared/sort/sort.inputs';

@InputType()
export class CreateHobbyInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class ListHobbyFiltersInput {
  @Field(() => String, { nullable: true })
  _id?: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class ListHobbySortsInput {
  @Field(() => SortsType, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateHobbyInput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}
