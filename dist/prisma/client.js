import { PrismaClient } from "@prisma/client";
const NODE_ENV = process.env.NODE_ENV;
const DB_DEV_URL = process.env.DB_DEV_URL;
const DB_TEST_URL = process.env.DB_TEST_URL;
const URL = NODE_ENV === "test" ? DB_TEST_URL : DB_DEV_URL;
const prisma = new PrismaClient({ datasources: { db: { url: URL } } });
export default prisma;
//# sourceMappingURL=client.js.map