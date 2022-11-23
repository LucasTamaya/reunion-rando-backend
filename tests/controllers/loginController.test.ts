require("dotenv").config();

import supertest from "supertest";
import sinon from "sinon";

import * as UserServices from "../../src/services/userServices";
import { app } from "../../jestSetup";
import {
  loginBody,
  loginBodyWithWrongPassword,
  loginErrorResponse,
  loginResponse,
  registerBody,
} from "../mocks/authControllersData";

describe("LoginController", () => {
  it("should returns a 200 status code if there are no errors", async () => {
    // creates a new user before
    await supertest(app).post("/register").send(registerBody);

    const { statusCode } = await supertest(app).post("/login").send(loginBody);

    expect(statusCode).toBe(200);
  });

  it("should returns a 200 status code and en error message if the user doesn't exists", async () => {
    const { statusCode, body } = await supertest(app)
      .post("/login")
      .send(loginBody);

    expect(statusCode).toBe(200);
    expect(body).toEqual(loginErrorResponse);
  });

  it("should returns a 200 status code and en error message if the passwords don't match", async () => {
    await supertest(app).post("/register").send(registerBody);

    const { statusCode, body } = await supertest(app)
      .post("/login")
      .send(loginBodyWithWrongPassword);

    expect(statusCode).toBe(200);
    expect(body).toEqual(loginErrorResponse);
  });

  it("should returns a 500 status code if there are any other erorrs", async () => {
    // simulates an error
    sinon.stub(UserServices, "getUserByEmail").throws(Error("error message"));

    const { statusCode } = await supertest(app)
      .post("/register")
      .send(loginBody);

    expect(statusCode).toBe(500);
  });
});
