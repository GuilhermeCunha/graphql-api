import { Model } from 'mongoose';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_SKIP,
} from '../pagination.constants';
import { PaginationInput } from '../pagination.inputs';
import { OffsetBasedPaginationOutput } from './offset-based-pagination.outputs';

export interface IGetOffsetBasedPagination {
  model: Model<any>;
  filters?: any;
  pagination?: PaginationInput;
}
export async function getOffsetBasedPagination({
  pagination = {},
  filters,
  model,
}: IGetOffsetBasedPagination): Promise<OffsetBasedPaginationOutput> {
  const total = await model.countDocuments(filters);
  const {
    limit = PAGINATION_DEFAULT_LIMIT,
    skip = PAGINATION_DEFAULT_SKIP,
  } = pagination;

  let pages = 0;

  if (total && limit > 0) {
    pages = Math.ceil(total / limit);
  }

  return {
    total,
    pages,
    limit,
    skip,
  };
}
