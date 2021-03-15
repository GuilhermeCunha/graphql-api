import { PaginationInput } from 'src/shared/pagination/pagination.inputs';
import { ListPersonFiltersInput, ListPersonSortsInput } from '../person.inputs';

export interface PersonServiceList {
  filters?: ListPersonFiltersInput;
  pagination?: PaginationInput;
  sorts?: ListPersonSortsInput;
}
