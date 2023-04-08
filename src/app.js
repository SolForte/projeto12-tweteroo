import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const PORT = 5000;
app.listen(PORT);
