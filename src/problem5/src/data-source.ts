import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";

// Used defaults for easing testing by the reviewing team.
export const AppDataSource = new DataSource({
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
});
