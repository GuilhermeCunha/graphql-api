import { ObjectType } from '@nestjs/graphql';

import { OffsetBasedPaginated } from 'src/shared/pagination/offset-based/offset-based-pagination.types';
import { PersonType } from './person.type';

@ObjectType()
export class OffsetBasedPaginatedPersonType extends OffsetBasedPaginated(
  PersonType,
) {}
