const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "¡Token no proporcionado!" });
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido!" });
  }
};

export default authMiddleware;
