import { Field, InputType, Int } from '@nestjs/graphql';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_SKIP,
} from './pagination.constants';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: PAGINATION_DEFAULT_LIMIT })
  limit?: number;

  @Field(() => Int, { nullable: true, defaultValue: PAGINATION_DEFAULT_SKIP })
  skip?: number;
}
