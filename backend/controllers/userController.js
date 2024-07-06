const userModel = require("../models/userModel");
const employeeModel = require("../models/employeeModel");
const {
  userValidationSchema,
  passwordValidatorSchema,
} = require("../middleware/schemaValidator");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");

// User Register
const userRegister = async (req, res) => {
  try {
    const { success, data, error } = userValidationSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: error.errors });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User email already exists" });
    }

    // Create a new user
    const user = new userModel(data);
    await user.save();
    new employeeModel({
      EmployeeId: user._id,
      role: "Employee",
    }).save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response
    res.status(201).json({
      message: `User registered successfully`,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//USER SIGNIN

const userSignin = async (req, res) => {
  try {
    const { success, data, error } = userValidationSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordMatch = await user.comparePassword(data.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response with token
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//USER UPDATE
const userUpdate = async (req, res) => {
  try {
    const id = req.userId;
    if (!id)
      return res
        .status(400)
        .json({ message: "UnAuthorized , UserId is Required" });

    const { success, data, error } = userValidationSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: error.errors });
    }

    // Check if email is being updated (not allowed)
    if (data.email !== undefined) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send response
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const id = req.userId;
    if (!id)
      return res
        .status(400)
        .json({ message: "UnAuthorized , UserId is Required" });

    const { success, data, error } = passwordValidatorSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({ message: error.errors });
    }
    // Check if the user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (data.confirmPassword === data.newPassword) {
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { $set: { password: data.newPassword } },
        { new: true, runValidators: true }
      );

      if (updatedUser) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get users
const getUsers = async (req, res) => {
  try {
    const users = await (await userModel.find()).at("-password");
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const user = await userModel.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userRegister,
  userSignin,
  userUpdate,
  changePassword,
  getUsers,
  getUserById,
  deleteUser,
};
