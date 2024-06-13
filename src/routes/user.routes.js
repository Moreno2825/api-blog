import { Router } from "express";
import * as userController from "../controllers/users/user.controller.js";

//! inicializar la funcion
const router = Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);

export default router;