import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { SortsType } from 'src/shared/sort/sort.inputs';

@InputType()
export class CreatePersonInput {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  hobbies: Types.ObjectId[];
}

@InputType()
export class ListPersonFiltersInput {
  @Field(() => String, { nullable: true })
  _id?: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  hobbies?: Types.ObjectId[];
}

@InputType()
export class ListPersonSortsInput {
  @Field(() => SortsType, { nullable: true })
  name?: string;
}

@InputType()
export class UpdatePersonInput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  hobbies?: Types.ObjectId[];
}
