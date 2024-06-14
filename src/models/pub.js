import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    id_user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const pubSchema = new Schema(
  {
    id_user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    image: {
      publicId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
    comment: [commentSchema],
  },
  {
    versionKey: false,
  }
);

export default model("Pub", pubSchema);
