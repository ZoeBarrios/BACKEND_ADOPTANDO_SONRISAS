import { ERRORS } from "../utils/errors.js";
const errorMiddleware = (err, req, res, next) => {
  const errorConfig = ERRORS[err.name];

  const errorName = errorConfig?.name || err.name || "Error desconocido";
  const errorStatus = errorConfig?.status || err.status || 500;
  const errorMessage =
    errorConfig?.message || err.message || "Mensaje de error desconocido";
  console.error(err);
  res.error(errorName, errorStatus, errorMessage);
};

export default errorMiddleware;
