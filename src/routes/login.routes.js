import { Router } from "express";
import * as authController from "../controllers/login.controller.js";
import { verifyDuplicateEmail } from "../middleware/verifySignUp.js";

//! inicializar la funcion
const router = Router();

router.post("/signup", authController.SignUp);
router.post("/signin", authController.SignIn);

export default router;
