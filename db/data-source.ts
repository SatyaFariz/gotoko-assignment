import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'db',
  username: 'admin',
  password: 'password',
  database: 'app',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource