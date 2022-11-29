import { createServer } from "./src/app";
import * as AuthServices from "@/services/authServices";
import { createJwt } from "@/services/authServices";

export const mockedJwt = createJwt("gaegaeg", "particulier");

// we mock the return value of the createJwt fn that generate an http cookie when the user log in
// in order to have the same token when we test the /user/role route, that requires a valid cookie
// to be valid
jest.spyOn(AuthServices, "createJwt").mockReturnValue(mockedJwt);

export const app = createServer();
