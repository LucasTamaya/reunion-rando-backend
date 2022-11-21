require("dotenv").config();

import mongoose from "mongoose";

import { createServer } from "./src/app";
import { dbConnection } from "./src/config/db";

const PORT: string | number = process.env.PORT || 4000;

dbConnection();

const app = createServer();

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("server now running on port", PORT);
  });
});

export default app;
