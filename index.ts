require("dotenv").config();

import { createServer } from "./src/app";

const PORT: string | number = process.env.PORT || 4000;

const app = createServer();

app.listen(PORT, () => {
  console.log("server now running on port", PORT);
});

export default app;
