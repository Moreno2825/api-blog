import { Router } from "express";
import * as pubController from "../controllers/pub/pub.controller.js";
import fileUpload from "express-fileupload";

//! inicializar la funcion
const router = Router();

router.post(
  "/create/pub",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  pubController.postPub
);

export default router;
