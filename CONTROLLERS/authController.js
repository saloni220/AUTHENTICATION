import userSchema from "../MODELS/userSchema.js";
import userModel from "../MODELS/userSchema.js";
import bcrypt from "bcrypt";
import { genToken } from "../MIDDLEWARE/token.js";
//register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please provide all fields (name, email, password)",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "user already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      role:role
    });

    await user.save();
    res.status(200).send({
      success: true,
      message: "user register successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in register API",
      error,
    });
  }
};
//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "please provide emai and password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user does not register with this email",
      });
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(420).send({
        success: false,
        message: "please enter correct password",
      });
    }
    const token = genToken({
      name: user.name,
      email: user.email,
      id: user._id,
      role: user.role,
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in login API",
      error,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name, password, email,role } = req.body;
    const user = await userModel.findById({ _id: req.params._id });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "please provide id ",
      });
    }
    if (name) {
      user.name = name;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }
    if (email) {
      user.email = email;
    }
    if (role) {
      user.role = role;
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfuly",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update API",
      error,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = await userSchema.findById({ _id: req.params._id });
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "please provide id",
      });
    }
    await userSchema.deleteOne(userId);
    res.status(200).send({
      success: true,
      message: "user delete successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in register API",
    });
  }
};
//get all user by admin
export const getAllUser = async (req, res) => {
  try {
    const User = await userModel.find();
    if (!User) {
      return res.status(400).send({
        success: false,
        message: "no user found",
      });
    }
    res.status(200).send({
      success: true,
      message: "all user find successfully",
      User,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get all user API ",
    });
  }
};
//get one user by id
export const getOneUser = async (req, res) => {
  try {
    const User = await userModel.findById({ _id: req.params._id });
    if (!User) {
      return res.status(400).send({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "get one user successfully",
      User,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get one user API",
    });
  }
};
// deete user by admin
export const deleteUserbyAdmin = async (req, res) => {
  try {
    const User = await userModel.findById({ _id: req.params._id });
    if (!User) {
      return res.status(400).send({
        success: false,
        message: "user not found",
      });
    }
    await userModel.deleteOne(User)
    res.status(200).send({
      success: true,
      message: "delete user successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in delete user by admin API",
    });
  }
};
export const updateUserbyAdmin = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await userModel.findById({ _id: req.params._id });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "please provide id ",
      });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (role) {
      user.role = role;
    }
    await user.save();
    res.status(200).send({
      success: true,
      message: "user update successfully by admin",
      user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update user by admin API",
    });
  }
};


