export interface UserModel {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  role: string;
}

export interface UserModelWithId extends UserModel {
  _id: string;
}
