import express from "express";
import swaggerSetup from "./src/config/swagger.js";
import { appConfig } from "./src/config/config.js";
import authMiddleware from "./src/middlewares/auth.js";
import usuarios from "./src/v1/routes/usersRoutes.js";
import auth from "./src/v1/routes/authRoutes.js";
import animals from "./src/v1/routes/animalsRoutes.js";
import adoptions from "./src/v1/routes/adoptionsRoutes.js";
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

app.use(multer().single("image"));

// Routes

app.use("/api/auth", auth);
app.use("/api/usuarios", authMiddleware, usuarios);
app.use("/api/animals", animals);
app.use("/api/adoptions", authMiddleware, adoptions);

export default app;
