import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debug log

export const genToken = ({ id, email, name, role }) => {
  return jwt.sign({ id, email, name, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

