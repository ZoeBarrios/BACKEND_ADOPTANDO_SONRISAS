import { verifyToken } from "../services/jwtService.js";
import { ERRORS } from "../utils/constants.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(ERRORS.Unauthorized);
  }

  try {
    const decodedToken = verifyToken(token);
    req.person = decodedToken;
    return next();
  } catch (error) {
    return next(ERRORS.Unauthorized);
  }
};

export default authMiddleware;
