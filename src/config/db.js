import pkg from "pg";
const { Client } = pkg;
import { connectionConfig } from "./config.js";

export const client = new Client(connectionConfig.connectionCongifDev);
export const connectionToDatabase = async () => {
  await client.connect();
  console.log("Database connected");
};
