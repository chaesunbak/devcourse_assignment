const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// JWT 토큰을 검증하는 미들웨어 함수
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decoded) => {
    if (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Failed to authenticate token" });
      }

      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Token has expired" });
      }

      if (error instanceof jwt.NotBeforeError) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Token not active yet" });
      }
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
