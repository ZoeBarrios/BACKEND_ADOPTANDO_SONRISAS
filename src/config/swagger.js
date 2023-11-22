import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de aplicación de AMOR PERRUNO",
      version: "1.0.0",
      description: "API para poder acceder a la aplicación de AMOR PERRUNO",
    },
    security: [
      // Definición de seguridad global
      {
        JWT: [], // Aquí defines el nombre del esquema de seguridad
      },
    ],
  },

  apis: ["src/v1/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default function (app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
