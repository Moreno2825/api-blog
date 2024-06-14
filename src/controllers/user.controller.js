import { handleNotFound } from "../helpers/validateHelper.js";
import User from "../models/user.js";

/**
 * Get all users
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} Returns a list of users with selected fields
 * @function getAll
 * @example
 * // Example usage in an Express route
 * app.get('/api/users', getAll);
 */
export const getAll = async (req, res) => {
  try {
    const users = await User.find();

    const userFilter = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
    }));

    const response = {
      users: userFilter,
      total: userFilter.length,
    };
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

///! get by id
export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return handleNotFound(res, User);

    const userFilter = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json({ users: userFilter });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await req.body;

    const { id } = req.params;

    if (!data.name || (!data.email && !data.password)) {
      return res.status(400).json({
        message:
          "Al menos un campo (name, email, password) debe estar presente para actualizar",
      });
    }

    if (!updateUser) return handleNotFound(res, User);

    const updateUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(201).json({ user: updateUser });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) return handleNotFound(res, User);

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
