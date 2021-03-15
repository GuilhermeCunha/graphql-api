import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationInput } from 'src/shared/pagination/pagination.inputs';
import { ListPersonFiltersInput, ListPersonSortsInput } from '../person.inputs';

@ArgsType()
export class ListPersonsArgs {
  @Field(() => ListPersonFiltersInput, { nullable: true })
  filters?: ListPersonFiltersInput;

  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput;

  @Field(() => ListPersonSortsInput, { nullable: true })
  sorts?: ListPersonSortsInput;
}
