import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de aplicación de Adoptando Sonrisas",
      version: "1.0.0",
      description:
        "API para poder acceder a la aplicación de Adoptando Sonrisas",
      contact: {
        email: "zoebarrios1@outlook.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["src/v1/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default function (app) {
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
