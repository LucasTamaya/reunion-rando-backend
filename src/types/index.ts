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

export interface ActivityBody {
  title: string;
  location: string;
  price: string;
  description: string;
  userId: string;
  file?: string;
}

export interface ActivityModel {
  title: string;
  location: string;
  price: number;
  description: string;
  image_url: string;
  userId: string;
}
