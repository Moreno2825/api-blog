import Pub from "../models/pub.js";
import User from "../models/user.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
import { handleNotFound } from "../helpers/validateHelper.js";
import mongoose from "mongoose";

/**
 * @function Crear Publicacion
 *
 * app.post('/api/pubs/create');
 */
export const postPub = async (req, res) => {
  try {
    const { id_user, title, content } = req.body;
    console.log(req.body);

    if (!id_user || !title || !content)
      return res.status(400).json({ message: "the field is empty" });

    const userFound = await User.findOne({ _id: req.body.id_user });
    if (!userFound)
      return res.status(400).json({ message: "user is not found" });

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

/**
 * @function Crear Comentarios
 *
 * app.post('/api/pubs/comment);
 */
export const postComment = async (req, res) => {
  try {
    const { id_user, comment, pubId } = req.body;

    if (!id_user || !comment || !pubId)
      return res.status(400).json({ message: "The field is empty" });

    const userFound = await User.findById(id_user);
    if (!userFound)
      return res.status(400).json({ message: "User is not found" });

    const pub = await Pub.findById(pubId);
    if (!pub) return res.status(404).json({ message: "Publication not found" });

    const newComment = {
      id_user,
      comment,
    };

    pub.comment.push(newComment);
    await pub.save();

    return res.status(201).json({ message: "Comment added", pub });
  } catch (error) {
    return res.status(500).json({ message: "Error", Error: error });
  }
};

/**
 * @function Consultar Publicaciones
 *
 * app.post('/api/pubs/getAll);
 */
export const getAllPub = async (req, res) => {
  try {
    const pubs = await Pub.find()
      .populate("id_user")
      .populate({
        path: "comment",
        populate: {
          path: "id_user",
          model: "User",
          select: "_id name",
        },
      });

    if (!pubs) return handleNotFound(res, Pub);

    const pubsFiltered = pubs.map((pub) => ({
      _id: pub._id,
      user: {
        _id: pub.id_user._id,
        name: pub.id_user.name,
      },
      title: pub.title,
      content: pub.content,
      image: pub.image,
      comment: pub.comment,
    }));

    const response = {
      pubs: pubsFiltered,
      total: pubsFiltered.length,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error", Error: error });
  }
};

export const getAllPubsByUser = async (req, res) => {
  const { id } = req.params;

  // Verificar si el id es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const pubs = await Pub.find({ id_user: id }).populate("id_user");

    if (!pubs.length) {
      return handleNotFound(res, "Publicaciones");
    }

    const pubsFiltered = pubs.map((pub) => ({
      _id: pub._id,
      user: {
        _id: pub.id_user._id,
        name: pub.id_user.name,
      },
      title: pub.title,
      content: pub.content,
      image: pub.image,
      comment: pub.comment,
    }));

    const response = {
      pubs: pubsFiltered,
      total: pubsFiltered.length,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error", Error: error.message });
  }
};
/**
 * @function Consultar Publicacion
 *
 * app.post('/api/pubs/:id);
 */
export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const pub = await Pub.findById(id).populate("id_user");

    const pubFiltered = {
      _id: pub._id,
      user: {
        _id: pub.id_user._id,
        name: pub.id_user.name,
      },
      title: pub.title,
      content: pub.content,
      image: pub.image,
      comment: pub.comment,
    };

    if (!pub) return handleNotFound(res, Pub);

    return res.status(200).json(pubFiltered);
  } catch (error) {
    return res.status(500).json({ message: "Error", Error: error });
  }
};

/**
 * @function Actualizar Publicacion
 *
 * app.post('/api/pubs/put/:id);
 */
export const updatePub = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, id_user } = req.body;
    const updateFields = {};

    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    const existingPub = await Pub.findById(id);
    if (!existingPub) return handleNotFound(res, Pub);

    if (existingPub.id_user._id.toString() !== id_user) {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar esta publicación" });
    }

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);

      updateFields.image = {
        publicId: result.public_id,
        secureUrl: result.secure_url,
      };

      fs.unlink(req.files.image.tempFilePath);
    }

    Object.assign(existingPub, updateFields);

    const updatePub = await existingPub.save();

    return res.status(200).json({ message: "Update Pub", updatePub });
  } catch (error) {
    return res.status(500).json({ message: "Error", Error: error });
  }
};

/**
 * @function Eliminar Publicacion
 *
 * app.post('/api/pubs/delete/:id);
 */
export const deletePub = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existingPub = await Pub.findById(id).populate("id_user");
    if (!existingPub) return handleNotFound(res, Pub);

    if (existingPub.id_user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No autorizado para eliminar esta publicación" });
    }

    const deletePub = await Pub.findByIdAndDelete(id);
    if (!deletePub) return handleNotFound(res, Pub);

    if (deletePub.image && deletePub.image.publicId) {
      await deleteImage(deletePub.image.publicId);
    }

    return res.status(200).json({ message: "Publicación eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar la publicación", error });
  }
};
