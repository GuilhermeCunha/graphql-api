import 'dotenv/config';

export const PORT = Number(process.env.PORT);

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PRODUCER = 'PRODUCER',
}
