import { Router } from "express";
import * as authController from "../controllers/autentications/login.controller.js";

//! inicializar la funcion
const router = Router();

router.post("/signup", authController.SignUp);
router.post("/signin", authController.SignIn);

export default router;