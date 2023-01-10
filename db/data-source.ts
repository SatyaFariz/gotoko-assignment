import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'db',//'localhost',
  username: 'admin',
  password: 'password',
  database: 'app',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js']
}

const dataSource = new DataSource({ ...dataSourceOptions, host: 'localhost' })
export default dataSource