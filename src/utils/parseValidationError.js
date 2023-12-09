import { ERRORS } from "../utils/constants.js";
export default function parseValidationError(error) {
  const errorMessages = error.details.map((err) => {
    if (err.type === "any.required") {
      return `El campo ${err.context.key} es obligatorio`;
    }
    return err.message;
  });

  const infError = {
    ...ERRORS.ValidationError,
    message: errorMessages,
  };

  throw infError;
}
