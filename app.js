import express from "express";
import swaggerSetup from "./src/config/swagger.js";
import { appConfig } from "./src/config/config.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import usuarios from "./src/v1/routes/personsRoutes.js";
import auth from "./src/v1/routes/authRoutes.js";
import animals from "./src/v1/routes/animalsRoutes.js";
import adoptions from "./src/v1/routes/adoptionsRoutes.js";
import activities from "./src/v1/routes/activitiesRoutes.js";
import cases from "./src/v1/routes/casesRoutes.js";
import organizations from "./src/v1/routes/organizationsRoutes.js";
import financial_info from "./src/v1/routes/financialInfoRoutes.js";
import ratings from "./src/v1/routes/ratingRoutes.js";
import email from "./src/v1/routes/emailRoutes.js";
import { responseHandler } from "./src/middlewares/responseHandler.js";
import { connectionToDatabase } from "./src/config/db.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
swaggerSetup(app);

// Settings
app.set("port", appConfig.port);
connectionToDatabase();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(responseHandler);

// Routes

app.use("/api/auth", auth);
app.use("/api/persons", authMiddleware, usuarios);
app.use("/api/animals", animals);
app.use("/api/adoptions", authMiddleware, adoptions);
app.use("/api/cases", cases);
app.use("/api/organizations", organizations);
app.use("/api/email", email);
app.use("/api/financialInfo", financial_info);
app.use("/api/activities", activities);
app.use("/api/ratings", authMiddleware, ratings);
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.use(errorMiddleware);

export default app;
