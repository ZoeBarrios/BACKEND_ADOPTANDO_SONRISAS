import { ERRORS } from "../utils/constants.js";

const checkRoles = (requiredRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.role;

    const hasRequiredRole =
      requiredRoles.filter((role) => role === userRoles).length > 0;

    if (!hasRequiredRole) {
      const error = new Error();
      error.message = ERRORS.NotEnoughPermissions.message;
      error.status = ERRORS.NotEnoughPermissions.status;
      error.name = ERRORS.NotEnoughPermissions.name;
      next(error);
    }

    return next();
  };
};

export default checkRoles;
