import User from "../../models/user.js";

///! get all
export const getAll = async (req, res) => {
  try {
    const users = await User.find();

    const userFilter = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
    }));
    return res.status(200).json({ users: userFilter });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

///! get by id
export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

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
