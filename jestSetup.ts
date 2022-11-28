import { createServer } from "./src/app";
import * as AuthServices from "@/services/authServices";

export const mockedJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODQ3ZTA2ZjQ0MzA3N2FlMjRhMmM1ZCIsInJvbGUiOiJwYXJ0aWN1bGllciIsImlhdCI6MTY2OTYyNzQwMiwiZXhwIjoxNjY5NzEzODAyfQ.-r5AeuE4i6NPEesUdccwkurBOndWJcqT5COEY2MnU9Q";

// we mock the return value of the createJwt fn that generate an http cookie when the user log in
// in order to have the same token when we test the /user/role route, that requires a valid cookie
// to be valid
jest.spyOn(AuthServices, "createJwt").mockReturnValue(mockedJwt);

export const app = createServer();
