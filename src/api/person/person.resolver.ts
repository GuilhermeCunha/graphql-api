import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Types } from 'mongoose';

import { PersonService } from './person.service';
import {
  CreatePersonInput,
  ListPersonFiltersInput,
  ListPersonSortsInput,
  UpdatePersonInput,
} from './person.inputs';
import { Hobby } from '../../mongoose/schemas/hobby.schema';
import {
  ListHobbyFiltersInput,
  ListHobbySortsInput,
} from '../hobby/hobby.inputs';
import { PaginationInput } from 'src/shared/pagination/pagination.inputs';
import { FirebaseRestAuth } from 'src/shared/authentication/firebase/rest/decorators/firebase-rest-auth.decorator';
import { ROLES } from 'src/config/constants';
import { FirebaseGraphQlAuth } from 'src/shared/authentication/firebase/graphql/decorators/firebase-graphql-auth.decorator';
import { PersonType } from './types/person.type';
import { PersonDocument } from 'src/mongoose/schemas/person.schema';
import { OffsetBasedPaginationOutput } from 'src/shared/pagination/offset-based/offset-based-pagination.outputs';
import { OffsetBasedPaginatedPersonType } from './types/offset-paginated.person.type';
import { ListPersonsArgs } from './args/persons.args';
import { IOffsetBasedPaginated } from 'src/shared/pagination/offset-based/offset-based-pagination.types';

@Resolver(() => PersonType)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => PersonType)
  async person(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.personService.getById(_id);
  }

  @Query(() => [PersonType])
  async persons(@Args() { filters, pagination, sorts }: ListPersonsArgs) {
    return this.personService.list({ filters, pagination, sorts });
  }

  @Query(() => OffsetBasedPaginatedPersonType)
  async offsetBasedPaginatedPersons(
    @Args() args: ListPersonsArgs,
  ): Promise<IOffsetBasedPaginated<PersonDocument>> {
    return {
      data: await this.personService.list(args),
      pagination: await this.personService.getOffsetBasedPagination(args),
    };
  }

  @FirebaseGraphQlAuth([])
  @Mutation(() => PersonType)
  async createPerson(@Args('payload') payload: CreatePersonInput) {
    return this.personService.create(payload);
  }

  @Mutation(() => PersonType)
  async updatePerson(@Args('payload') payload: UpdatePersonInput) {
    return this.personService.update(payload);
  }

  @FirebaseRestAuth([ROLES.USER])
  @Mutation(() => PersonType)
  async deletePerson(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.personService.delete(_id);
  }

  @ResolveField()
  async hobbies(
    @Parent() person: PersonDocument,
    @Args('filters', { nullable: true }) filters?: ListHobbyFiltersInput,
    @Args('sorts', { nullable: true }) sorts?: ListHobbySortsInput,
    @Args('populate', { nullable: true, defaultValue: false })
    populate?: boolean,
  ) {
    if (populate) {
      await person
        .populate({
          path: 'hobbies',
          model: Hobby.name,
          match: filters,
          options: {
            sort: sorts,
          },
        })
        .execPopulate();
    }

    return person.hobbies;
  }
}
