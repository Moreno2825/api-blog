import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

//! inicializar la funcion
const router = Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.put("/users/put/:id", userController.updateUser);

export default router;