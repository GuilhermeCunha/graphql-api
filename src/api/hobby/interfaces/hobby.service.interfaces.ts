import { PaginationInput } from 'src/shared/pagination/pagination.inputs';
import { ListHobbyFiltersInput, ListHobbySortsInput } from '../Hobby.inputs';

export interface HobbyServiceList {
  filters?: ListHobbyFiltersInput;
  pagination?: PaginationInput;
  sorts?: ListHobbySortsInput;
}
