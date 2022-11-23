export const registerBody = {
  lastname: "doe",
  firstname: "john",
  email: "john.doe@orange.fr",
  password: "123456",
  role: "particulier",
};

export const registerResponse = {
  isSuccess: true,
};

export const registerErrorResponse = {
  isError: true,
  message: "L'utilisateur existe déjà",
};

export const loginBody = {
  email: "john.doe@orange.fr",
  password: "123456",
};

export const loginBodyWithWrongPassword = {
  email: "john.doe@orange.fr",
  password: "faegagaeg",
};

export const loginResponse = {
  isSuccess: true,
};

export const loginErrorResponse = {
  isError: true,
};

export const unknownErrorResponse = {
  message: "Une erreur est survenue",
};
