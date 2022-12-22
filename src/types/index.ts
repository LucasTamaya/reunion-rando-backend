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
  createdById: string;
  file: string;
  cloudinaryPublicId: string;
}

export interface ActivityModel {
  title: string;
  location: string;
  price: number;
  description: string;
  image_url: string;
  cloudinary_public_id: string;
  createdById: string;
}

export interface UpdateUserBody {
  lastname?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
}
