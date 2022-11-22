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

export const unknownErrorResponse = {
  message: "Une erreur est survenue",
};
