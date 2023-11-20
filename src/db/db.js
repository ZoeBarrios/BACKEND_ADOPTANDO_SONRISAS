import pkg from "pg";
const { Client } = pkg;
import { connectionConfig } from "../config/config.js";

export const connectionToDatabase = async () => {
  const client = new Client(connectionConfig.connectionCongifDev);
  await client.connect();
  console.log("Database connected");
};
