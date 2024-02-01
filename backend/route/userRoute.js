import express from "express";
import { userCreate, userLogin, getalluser } from "../controller/user.js";
import { getallProduct } from "../controller/product.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/create").post(userCreate);
userRouter.route("/getalluser").get(authMiddleware, getalluser);

/**     PRODUCT   ROUTE  START*/
userRouter.route("/getallproducts").get(getallProduct);
/**       PRODUCT   ROUTE  END*/

export default userRouter;
