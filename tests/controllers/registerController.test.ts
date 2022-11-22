require("dotenv").config();

import supertest from "supertest";
import sinon from "sinon";

import { createServer } from "../../src/app";
import { clearDb, closeDb, inMemoryDbConnect } from "../config/dbHandler";
import * as UserServices from "../../src/services/userServices";
import { unknownErrorResponse } from "../mocks/authControllersData";
import {
  registerBody,
  registerResponse,
  registerErrorResponse,
} from "../mocks/authControllersData";

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

const app = createServer();

describe("RegisterController", () => {
  it("should returns a 200 status code if there are no errors", async () => {
    jest.spyOn(UserServices, "getUserByEmail");

    const { statusCode, body } = await supertest(app)
      .post("/register")
      .send(registerBody);

    expect(statusCode).toBe(200);
    expect(body).toEqual(registerResponse);
  });

  it("should returns a 200 status code and en error message if the user already exists", async () => {
    jest.spyOn(UserServices, "getUserByEmail");

    // register the user for the 1st time
    await supertest(app).post("/register").send(registerBody);

    // try to register the same user for the 2nd time
    const { statusCode, body } = await supertest(app)
      .post("/register")
      .send(registerBody);

    expect(statusCode).toBe(200);
    expect(body).toEqual(registerErrorResponse);
  });

  it("should returns a 500 status code and an error message if there are any other erorrs", async () => {
    // simulate an error
    sinon.stub(UserServices, "getUserByEmail").throws(Error("error message"));

    const { statusCode, body } = await supertest(app)
      .post("/register")
      .send(registerBody);

    expect(statusCode).toBe(500);
    expect(body).toEqual(unknownErrorResponse);
  });
});
