import { Sequelize } from "sequelize";
import { connectionConfig } from "./config.js";

export const sequelize = new Sequelize(
  connectionConfig.database,
  connectionConfig.person,
  connectionConfig.password,
  {
    host: connectionConfig.host,
    dialect: "postgres",
    logging: false, //DESACTIVA LOS LOGS DE SQL
  }
);

export const connectionToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};
