import dotenv from "dotenv";

import { createServer } from "./app.js";

dotenv.config();
const PORT: string | number = process.env.PORT || 4000;
const app = createServer();

app.listen(PORT, () => {
  console.log("server now running on port", PORT);
});

export default app;
