import { registerEnumType } from '@nestjs/graphql';

export enum SortsType {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortsType, {
  name: 'Sorts',
});
