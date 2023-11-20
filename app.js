import express from "express";
import { appConfig } from "./src/config/config.js";
import usuarios from "./src/v1/routes/usersRoutes.js";
import auth from "./src/v1/routes/authRoutes.js";
import { responseHandler } from "./src/middlewares/responseHandler.js";
import { connectionToDatabase } from "./src/db/db.js";

const app = express();

// Settings
app.set("port", appConfig.port);
connectionToDatabase();

// Middlewares
app.use(express.json());
app.use(responseHandler);

// Routes
app.use("/api/auth", auth);
app.use("/api/usuarios", usuarios); // Agregué una barra diagonal antes de "api/usuarios"

export default app;
