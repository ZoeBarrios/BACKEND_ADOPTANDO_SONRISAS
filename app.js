import express from "express";
import swaggerSetup from "./src/config/swagger.js";
import { appConfig } from "./src/config/config.js";
import authMiddleware from "./src/middlewares/auth.js";
import usuarios from "./src/v1/routes/usersRoutes.js";
import auth from "./src/v1/routes/authRoutes.js";
import animals from "./src/v1/routes/animalsRoutes.js";
import adoptions from "./src/v1/routes/adoptionsRoutes.js";
import cases from "./src/v1/routes/casesRoutes.js";
import volunteers from "./src/v1/routes/volunteerRoutes.js";
import organizations from "./src/v1/routes/organizationsRoutes.js";
import financial_info from "./src/v1/routes/financialInfoRoutes.js";
import email from "./src/v1/routes/emailRoutes.js";
import { responseHandler } from "./src/middlewares/responseHandler.js";
import { connectionToDatabase } from "./src/config/db.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

const app = express();
swaggerSetup(app);

// Settings
app.set("port", appConfig.port);
connectionToDatabase();

// Middlewares
app.use(express.json());
app.use(responseHandler);

// Routes

app.use("/api/auth", auth);
app.use("/api/users", authMiddleware, usuarios);
app.use("/api/animals", animals);
app.use("/api/adoptions", authMiddleware, adoptions);
app.use("/api/cases", cases);
app.use("/api/organizations", organizations);
app.use("/api/volunteers", authMiddleware, volunteers);
app.use("/api/email", email);
app.use("/api/financial_info", financial_info);
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.use(errorMiddleware);

export default app;
