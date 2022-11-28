require("dotenv").config();

import supertest from "supertest";
import sinon from "sinon";

import { app, mockedJwt } from "../../jestSetup";
import * as ActivityServices from "@/services/activityServices";
import prisma from "@/prisma/client";

const newActivity = {
  title: "Super hike",
  price: 20,
  description: "A super hike on a beautiful island",
  location: "Mafate",
};

// afterEach(async () => {
//   await prisma.activity.deleteMany();
// });

afterAll(async () => {
  await prisma.$disconnect();
});

describe("addActivityController", () => {
  it("should returns a 200 status code if there are no errors when we add a new activity", async () => {
    const { statusCode } = await supertest(app)
      .post("/activity")
      .send(newActivity)
      .set("Cookie", `token=${mockedJwt}`);

    expect(statusCode).toBe(200);
  });

  it("should returns a 401 status code if the user doesn't have a token", async () => {
    const { statusCode } = await supertest(app)
      .post("/activity")
      .send(newActivity);

    expect(statusCode).toBe(401);
  });

  it("should returns a 500 status code if there are any other errors", async () => {
    sinon
      .stub(ActivityServices, "createNewActivity")
      .throws(Error("error message"));

    const { statusCode } = await supertest(app)
      .post("/activity")
      .send(newActivity)
      .set("Cookie", `token=${mockedJwt}`);

    expect(statusCode).toBe(500);
  });
});
