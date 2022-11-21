import { Schema, model, models } from "mongoose";

import { UserModel } from "src/types";

const UserSchema: Schema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default models.User || model<UserModel>("User", UserSchema);
