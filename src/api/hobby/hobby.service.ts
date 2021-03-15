import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { applyPagination } from 'src/shared/pagination/pagination.utils';

import { CreateHobbyInput, UpdateHobbyInput } from './hobby.inputs';
import { Hobby, HobbyDocument } from '../../mongoose/schemas/hobby.schema';
import { HobbyServiceList } from './interfaces/hobby.service.interfaces';
import { getOffsetBasedPagination } from 'src/shared/pagination/offset-based/mongoose-pagination.utils';

@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>,
  ) {}

  create(payload: CreateHobbyInput) {
    const createdHobby = new this.hobbyModel(payload);
    return createdHobby.save();
  }

  getById(_id: Types.ObjectId) {
    return this.hobbyModel.findById(_id).exec();
  }

  list({ filters, pagination, sorts }: HobbyServiceList) {
    let query = this.hobbyModel.find(
      { ...filters },
      {},
      {
        sort: sorts,
      },
    );
    query = applyPagination(query, pagination);

    return query.exec();
  }

  getOffsetBasedPagination({ filters, sorts, pagination }: HobbyServiceList) {
    return getOffsetBasedPagination({
      model: this.hobbyModel,
      filters,
      pagination,
    });
  }

  update(payload: UpdateHobbyInput) {
    return this.hobbyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: Types.ObjectId) {
    return this.hobbyModel.findByIdAndDelete(_id).exec();
  }
}
