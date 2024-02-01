import jwt from "jsonwebtoken";
import USER from "../model/userModel.js";
export const authMiddleware = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const Token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(Token, "secret");

      const checkUser = await USER.findOne({
        _id: decode.checkUser._id,
        loginTime: decode.iat,
      });

      if (checkUser) {
        req.user = checkUser;
        next();
      } else {
        return res
          .status(401)
          .json({ code: 401, message: "Invalid token", body: null });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ code: 401, message: error.message, body: null });
  }
};
