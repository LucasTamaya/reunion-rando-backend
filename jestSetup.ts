import { clearDb, closeDb, inMemoryDbConnect } from "./tests/config/dbHandler";
import { createServer } from "./src/app";

beforeAll(async () => {
  await inMemoryDbConnect();
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await closeDb();
});

export const app = createServer();
