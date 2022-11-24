require("dotenv").config();

import supertest from "supertest";

import { app } from "../../jestSetup";
import * as AuthServices from "@/services/authServices";
import { loginBody, registerBody } from "../mocks/authControllersData";

const mockedJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQG9yYW5nZS5mciIsImxhc3RuYW1lIjoiZG9lIiwicm9sZSI6InBhcnRpY3VsaWVyIiwiaWF0IjoxNjY5MjgyNjQ0LCJleHAiOjE2NjkzNjkwNDR9.7UJxlmDc4f0A3lQ2y0FLlOGlyeoqISNFU2FEfUgK1uU";

// we mock the return value of the createJwt fn that generate an http cookie when the user log in
// in order to have the same token when we test the /user/role route, that requires a valid cookie
// to be valid
jest.spyOn(AuthServices, "createJwt").mockReturnValue(mockedJwt);

describe("getUserRoleController", () => {
  it("should returns a 200 status code and the user role if the user has a valid token", async () => {
    // creates a new user and simulates the login
    await supertest(app).post("/register").send(registerBody);
    await supertest(app).post("/login").send(loginBody);

    const { statusCode, body } = await supertest(app)
      .get("/user/role")
      .set("Cookie", `token=${mockedJwt}`);

    const mockedUserRole = "particulier";

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockedUserRole);
  });

  it("should returns a 401 status code if the user doesn't have a valid token", async () => {
    await supertest(app).post("/register").send(registerBody);
    await supertest(app).post("/login").send(loginBody);

    const wrongJwt = "iengaeingae.ainegiaeng.apiengiaengaev";

    const { statusCode } = await supertest(app)
      .get("/user/role")
      .set("Cookie", `token=${wrongJwt}`);

    expect(statusCode).toBe(401);
  });

  it("should returns a 401 status code if the user doesn't have a token", async () => {
    const { statusCode } = await supertest(app).get("/user/role");

    expect(statusCode).toBe(401);
  });
});
