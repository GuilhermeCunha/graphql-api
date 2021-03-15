import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_SKIP,
} from './pagination.constants';
import { PaginationInput } from './pagination.inputs';

export function applyPagination(query: any, pagination?: PaginationInput): any {
  if (pagination) {
    query.limit(pagination.limit || PAGINATION_DEFAULT_LIMIT);
    query.skip(pagination.skip || PAGINATION_DEFAULT_SKIP);
  }

  return query;
}
