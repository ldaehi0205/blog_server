import SQ from 'sequelize';
import dotenv from 'dotenv';
const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = dotenv.config().parsed;

export const sequelize = new SQ.Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});
