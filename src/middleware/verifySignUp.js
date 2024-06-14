import User from "../models/user.js";

export const verifyDuplicateEmail = async (req, res) => {
  const user = User.findOne({ email: req.body.email });

  if(user)
    return res.status(400).json({message:"The email is already use"})
};
