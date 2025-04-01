const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
exports.authCheck = async (req, res, next) => {
  try {
    
    const authorization = req.headers.authorization;
    
    if (!authorization) {
      return createError(400, "Missing Token!!!");
    }

    console.log("authorization:", authorization)

    const token = authorization.split(" ")[1];
    // Verify token
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        return createError(401, "Unauthorized !!");
      }
    
      req.user = decode;

      next();
    });
  } catch (error) {
    next(error);
  }
};
