import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OffsetBasedPaginationOutput {
  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  total: number;
}
