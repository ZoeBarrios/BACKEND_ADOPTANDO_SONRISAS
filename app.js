import express from "express";
import swaggerSetup from "./src/config/swagger.js";
import { appConfig } from "./src/config/config.js";
import usuarios from "./src/v1/routes/usersRoutes.js";
import auth from "./src/v1/routes/authRoutes.js";
import animals from "./src/v1/routes/animalsRoutes.js";
import { responseHandler } from "./src/middlewares/responseHandler.js";
import { connectionToDatabase } from "./src/config/db.js";
import multer from "multer";

const app = express();
swaggerSetup(app);

// Settings
app.set("port", appConfig.port);
connectionToDatabase();

// Middlewares
app.use(express.json());
app.use(responseHandler);
app.use(multer().single("imagen"));

// Routes
app.use("/api/auth", auth);
app.use("/api/usuarios", usuarios);
app.use("/api/animals", animals);

export default app;
