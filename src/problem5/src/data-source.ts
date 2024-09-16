import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { Post } from "./entity/Post";

const useSqlite3 = process.argv?.[2]?.split?.("=")?.[1] === "sqlite3";

// Used defaults for easing testing by the reviewing team.
let PG_OPTS: DataSourceOptions = {
  type: "postgres",
  host: process.env.PG_DB_HOST || "localhost",
  port: 5432,
  username: process.env.PG_DB_USERNAME || "postgres",
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME || "postgres",
  synchronize: true,
  logging: false,
  entities: [Post],
  migrations: [],
  subscribers: [],
};

if (useSqlite3) {
  PG_OPTS = {
    type: "sqlite",
    database: ":memory:",
    entities: [Post],
    synchronize: true,
    logging: false,
  };
}
export const AppDataSource = new DataSource(PG_OPTS);
