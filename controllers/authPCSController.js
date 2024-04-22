import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userPCSModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "./mail-service.js";

export const registerPCSController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      employeeId,
      dateOfJoining,
    } = req.body;

    //console.log(firstName, lastName, email, password, phoneNo);
    if (!firstName) {
      return res.send({ message: "Name is Required" });
    }
    if (!lastName) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phoneNo) {
      return res.send({ message: "Phone Number is Required" });
    } else if (phoneNo.length !== 10) {
      return res.send({ message: "Phone Number must be 10 digits long" });
    }
    if (!employeeId) {
      return res.send({ message: "employeeId is Required" });
    }
    if (!dateOfJoining) {
      return res.send({ message: "dateOfJoining is Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNo,
      employeeId,
      dateOfJoining,
    });
    await user.save();

    res.status(201).send({
      success: true,
      message: "user Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

export const loginPCSController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }
    if (user.role === "admin") {
      user.isVerified = true
    }

    if (!user.isVerified) {
      return res.status(200).send({
        success: false,
        message: 'Please contact admin for verification',
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNo: user.phoneNo,
        employeeId: user.employeeId,
        dateOfJoining: user.dateOfJoining,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const getPCSAllUsers = async (req, res) => {
  try {
    // Add logic here to fetch the users data from the database
    const users = await userModel.find();

    res.status(200).send({
      success: true,
      message: "Fetched users successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

export const getPCSUser = async (req, res) => {
  try {
    // Assuming the user ID is passed in the request parameters
    const { _id } = req.params;

    // Fetch the user from the database based on the user ID
    const user = await userModel.findOne({ _id });

    if (user) {
      res.status(200).send({
        success: true,
        message: "Fetched user successfully",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body; // Assuming you're sending { isVerified: true/false } in the request body
    // Find the user by ID and update the isVerified field
    const updatedUser = await userModel.findByIdAndUpdate(id, { isVerified }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send({
      success: true,
      message: "User Updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user",
      error,
    });
  }
}

export const getPCSForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    await user.save();

    const message =
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
      `http://3.212.222.137/reset-password-pcs/${user._id}/${token}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`;
    await sendEmail(email, message);

    res
      .status(200)
      .send({ success: true, message: "Password reset email sent." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset password",
      error,
    });
  }
};

export const getPCSResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    // Verify the JWT token
    const decoded = await JWT.verify(token, process.env.JWT_SECRET);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assuming you have a User model and you want to update the user's password
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user is not registered",
      });
    }

    return res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Invalid Token",
      error,
    });
  }
};
