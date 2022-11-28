require("dotenv").config();

import supertest from "supertest";
import sinon from "sinon";

import * as UserServices from "@/services/userServices";
import { registerBody } from "../mocks/authControllersData";
import { app } from "../../jestSetup";
import prisma from "@/prisma/client";

beforeAll(async () => {
  await prisma.user.deleteMany();
});
afterEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("registerController", () => {
  it("should returns a 200 status code if there are no errors", async () => {
    const { statusCode } = await supertest(app)
      .post("/register")
      .send(registerBody);

    expect(statusCode).toBe(200);
  });

  it("should returns a 409 status code if the user already exists", async () => {
    // register the user for the 1st time
    await supertest(app).post("/register").send(registerBody);

    // try to register the same user for the 2nd time
    const { statusCode } = await supertest(app)
      .post("/register")
      .send(registerBody);

    expect(statusCode).toBe(409);
  });

  it("should returns a 500 status code if there are any other errors", async () => {
    // simulates an error
    sinon.stub(UserServices, "getUserByEmail").throws(Error("error message"));

    const { statusCode } = await supertest(app)
      .post("/register")
      .send(registerBody);

    expect(statusCode).toBe(500);
  });
});
