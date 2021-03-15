import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { HobbyService } from './hobby.service';
import {
  CreateHobbyInput,
  ListHobbyFiltersInput,
  ListHobbySortsInput,
  UpdateHobbyInput,
} from './hobby.inputs';
import { HobbyType } from './types/hobby.type';

@Resolver(() => HobbyType)
export class HobbyResolver {
  constructor(private hobbyService: HobbyService) {}

  @Query(() => HobbyType)
  async hobby(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.hobbyService.getById(_id);
  }

  @Query(() => [HobbyType])
  async hobbies(
    @Args('filters', { nullable: true }) filters?: ListHobbyFiltersInput,
    @Args('sorts', { nullable: true }) sorts?: ListHobbySortsInput,
  ) {
    return this.hobbyService.list({ filters, sorts });
  }

  @Mutation(() => HobbyType)
  async createHobby(@Args('payload') payload: CreateHobbyInput) {
    return this.hobbyService.create(payload);
  }

  @Mutation(() => HobbyType)
  async updateHobby(@Args('payload') payload: UpdateHobbyInput) {
    return this.hobbyService.update(payload);
  }

  @Mutation(() => HobbyType)
  async deleteHobby(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.hobbyService.delete(_id);
  }
}
