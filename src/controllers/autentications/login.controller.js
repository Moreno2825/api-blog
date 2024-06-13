import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const responseData = await User.create({
      name,
      email,
      password,
    });
    res.send({ data: responseData });
  } catch (error) {
    console.error("Error interno del servidor", error);
    return res.status(500).json({ Error: error });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password)
      return res.status(400).json({ message: "the field is empty" });

    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound)
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });

    if (password != userFound.password)
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });

    const token = jwt.sign({id:userFound._id, name: userFound.name}, "process.env.SECRET_KEY",{
        expiresIn: 3600 // 1 hora
    })


    return res.status(200).json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      token
    });
  } catch (error) {
    console.error("Error interno del servidor", error);
    return res.status(500).json({ Error: error });
  }
};
