//Variables de configuracion de la aplicacion
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const appConfig = {
  port: process.env.PORT || 4000,
  url: process.env.URL || "http://localhost:4000",
  email: process.env.EMAIL,
};
export const connectionConfig = {
  person: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
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

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    person: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
