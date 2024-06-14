import User from "../models/user.js";
import Pub from "../models/pub.js";

export const verifiUser = async(req, res) =>{
    const pub = Pub.findById({_id: req.body.id_user._id})
}