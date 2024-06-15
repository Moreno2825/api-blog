import { Router } from "express";
import * as pubController from "../controllers/pub.controller.js";
import fileUpload from "express-fileupload";

//! inicializar la funcion
const router = Router();

router.post(
  "/pubs/create",
  fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),
  pubController.postPub
);
router.get("/pubs/getAll", pubController.getAllPub);
router.get("/pubs/:id", pubController.getById);
router.get('/user/:id', pubController.getAllPubsByUser);
router.put(
  "/pubs/put/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  pubController.updatePub
);
router.delete("/pubs/delete/:id", pubController.deletePub);
router.post("/pubs/comment", pubController.postComment);

export default router;
