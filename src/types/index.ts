export interface UserModel {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

export interface UserModelWithId extends UserModel {
  id: string;
}

export interface ActivityModel {
  title: string;
  location: string;
  price: number;
  description: string;
  userId: string;
}
