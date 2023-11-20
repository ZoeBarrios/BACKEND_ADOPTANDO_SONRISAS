//Variables de configuracion de la aplicacion
import dotenv from "dotenv";
dotenv.config();
export const appConfig = {
  port: process.env.PORT || 4000,
};
export const connectionConfig = {
  connectionCongifDev: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  },
};
