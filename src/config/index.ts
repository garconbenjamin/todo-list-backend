import 'dotenv/config';
import type { Dialect } from 'sequelize';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
export const dbConfig = {
  dialect: process.env.DB_CONNECTION as Dialect,
  host: process.env.HOST as string,
  username: process.env.USERNAME as string,
  password: process.env.PASSWORD as string,
  database: process.env.DATABASE as string,
  port: process.env.PORT as unknown as number,
};
