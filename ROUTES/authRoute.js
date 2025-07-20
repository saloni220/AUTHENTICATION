import express from "express";
import {
  deleteUser,
  deleteUserbyAdmin,
  getAllUser,
  getOneUser,
  loginController,
  registerController,
  updateProfile,
  updateUserbyAdmin,
} from "../CONTROLLERS/authController.js";
import { verToken } from "../MIDDLEWARE/verToken.js";
import authrole from "../MIDDLEWARE/adminauth.js";
const router = express.Router();
//controller for registration
router.post("/register", registerController);
//login route
router.get("/login", loginController);
//update
router.put("/update/:_id", verToken, updateProfile);
//delete
router.delete("/delete/:_id", verToken, deleteUser);
//for admin get all user
router.get("/getall", verToken, authrole, getAllUser);
//for admin get one user
router.get("/getOne/:_id", verToken, authrole, getOneUser);
//for admin delete any user by id
router.delete("/deleteUser/:_id", verToken, authrole, deleteUserbyAdmin);
//for admin update user by id
router.put("/updateUser/:_id", verToken, authrole, updateUserbyAdmin);
export default router;
