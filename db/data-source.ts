import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,//'db',//'localhost',
  username: process.env.MYSQL_USER,//'admin',
  password: process.env.MYSQL_PASSWORD,//'password',
  database: process.env.MYSQL_DBNAME,//'app',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js']
}

const dataSource = new DataSource({ ...dataSourceOptions })
export default dataSource