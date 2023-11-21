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

export const firebaseConfig = {
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSENGER_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  },
};
