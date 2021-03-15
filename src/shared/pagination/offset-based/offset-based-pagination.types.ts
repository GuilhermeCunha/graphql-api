import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { OffsetBasedPaginationOutput } from './offset-based-pagination.outputs';

export function OffsetBasedPaginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class OffsetBasedPaginatedType {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => OffsetBasedPaginationOutput)
    pagination: OffsetBasedPaginationOutput;
  }
  return OffsetBasedPaginatedType;
}

export interface IOffsetBasedPaginated<T> {
  data: T[];
  pagination: OffsetBasedPaginationOutput;
}
