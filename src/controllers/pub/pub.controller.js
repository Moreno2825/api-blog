import Pub from "../../models/pub.js";
import User from "../../models/user.js";
import { uploadImage, deleteImage } from "../../utils/cloudinary.js";
import fs from "fs-extra";

export const postPub = async (req, res) => {
  try {
    const { id_user, title, content } = req.body;
    console.log(req.body);

    if (!id_user || !title || !content)
      return res.status(400).json({ message: "the field is empty" });

    const userFound = await User.findOne({ _id: req.body.id_user });
    if (!userFound)
      return res
        .status(400)
        .json({ message: "user is not found" });

    const newPub = new Pub({
      id_user,
      title,
      content,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      newPub.image = {
        publicId: result.public_id,
        secureUrl: result.secure_url,
      };

      fs.unlink(req.files.image.tempFilePath);
    }

    const pubSave = await newPub.save();
    return res.status(201).json({ message: "Created pub", pubSave });
  } catch (error) {
    return res.status(500).json({ message: "Error", Error: error });
  }
};
