import express, { Request, Response } from "express";

import routes from "./routes";
import { notFound } from "./middlewares";
import { AppDataSource } from "./data-source";


// Database
// (async () => {
//   console.log('calling')
//   try {
//     await AppDataSource.initialize()
//     console.log('connected to db')
//   } catch (error) {
//     console.log('db connection err', error)
//   }
// })()

// AppDataSource.initialize().catch((error) => console.log(error))

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hey 99Tech!" });
});

app.use("/api/v1", routes);

app.use(notFound);


// Output to error logs, or some error reporting tool.
process.on("uncaughtException", function (err) {
  console.log(err);
});

export default app;
