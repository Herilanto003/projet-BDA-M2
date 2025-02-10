import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Activation des cors pour toutes les routes
app.use(cors());

// Utilisation de body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
