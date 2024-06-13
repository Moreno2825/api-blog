import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res) => {
    res.status(404).json("ruta no encontrada");
})

export default app;