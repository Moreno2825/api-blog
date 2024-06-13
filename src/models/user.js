import { Schema, model } from "mongoose";

export const userSchema = new Schema(
    {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
},{
    versionKey: false
}
);

export default model("User", userSchema);
