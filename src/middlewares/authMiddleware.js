import { verifyToken } from "../services/jwtService.js";
import { ERRORS } from "../utils/errors.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(ERRORS.Unauthorized);
  }

  try {
    const decodedToken = verifyToken(token);
    req.person = decodedToken;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      return next(ERRORS.TokenExpired);
    }

    return next();
  } catch (error) {
    return next(ERRORS.Unauthorized);
  }
};

export default authMiddleware;
