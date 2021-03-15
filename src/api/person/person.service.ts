import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { applyPagination } from 'src/shared/pagination/pagination.utils';
import { PersonServiceList } from './interfaces/person.service.interfaces';

import { CreatePersonInput, UpdatePersonInput } from './person.inputs';
import { Person, PersonDocument } from '../../mongoose/schemas/person.schema';
import { getOffsetBasedPagination } from 'src/shared/pagination/offset-based/mongoose-pagination.utils';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  create(payload: CreatePersonInput) {
    const createdPerson = new this.personModel(payload);
    return createdPerson.save();
  }

  getById(_id: Types.ObjectId) {
    return this.personModel.findById(_id).exec();
  }

  list({ filters, sorts, pagination }: PersonServiceList) {
    let query = this.personModel.find(
      { ...filters },
      {},
      {
        sort: sorts,
      },
    );
    query = applyPagination(query, pagination);

    return query.exec();
  }

  getOffsetBasedPagination({ filters, sorts, pagination }: PersonServiceList) {
    return getOffsetBasedPagination({
      model: this.personModel,
      filters,
      pagination,
    });
  }

  update(payload: UpdatePersonInput) {
    return this.personModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: Types.ObjectId) {
    return this.personModel.findByIdAndDelete(_id).exec();
  }
}
