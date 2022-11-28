require("dotenv").config();

import supertest from "supertest";
import sinon from "sinon";

import { app, mockedJwt } from "../../jestSetup";
import * as HikeServices from "@/services/hikeServices";

describe("getAllHikesController", () => {
  it("should returns a 200 status code and some hike names if there are no errors", async () => {
    const { statusCode, body } = await supertest(app)
      .get("/hikes")
      .set("Cookie", `token=${mockedJwt}`);

    const mockedResponse = {
      hikes: [
        { name: "Dos d'Ane - Cap Noir" },
        { name: "Canalisation Augustave-Aurère" },
        { name: "Hell bourg - Source Manouilh" },
      ],
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockedResponse);
  });

  it("should returns a 401 status code if the user doesn't have a token", async () => {
    const { statusCode } = await supertest(app).get("/hikes");

    expect(statusCode).toBe(401);
  });

  it("should returns a 500 status code if there are any other erorrs", async () => {
    sinon.stub(HikeServices, "getAllHikes").throws(Error("error message"));

    const { statusCode } = await supertest(app)
      .get("/hikes")
      .set("Cookie", `token=${mockedJwt}`);

    expect(statusCode).toBe(500);
  });
});
