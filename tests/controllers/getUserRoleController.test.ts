require("dotenv").config();

import supertest from "supertest";

import { app, mockedJwt } from "../../jestSetup";
import { loginBody, registerBody } from "../mocks/authControllersData";

describe("getUserRoleController", () => {
  it("should returns a 200 status code and the user role if the user has a valid token", async () => {
    // creates a new user and simulates the login
    await supertest(app).post("/register").send(registerBody);
    await supertest(app).post("/login").send(loginBody);

    const { statusCode, body } = await supertest(app)
      .get("/user/role")
      .set("Cookie", `token=${mockedJwt}`);

    const mockedUserRole = { role: "particulier" };

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
