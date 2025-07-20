import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// dotenv.config();
dotenv.config({ path: "../.env" });

export const verToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "please provide token",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.send({ success: false, message: "error", error });
  }
};
