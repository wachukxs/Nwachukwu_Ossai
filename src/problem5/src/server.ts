import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./data-source";

const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
  app.listen(port);
  console.log(`Server started on port :${port}`);
}).catch((err) => console.error('ERR:', err));
