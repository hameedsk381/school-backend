const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const handleFileUpload = require("../middlewares/multerMiddleware");
const bcrypt = require("bcrypt");
const authHandler = require("../middlewares/authHandler");
require("dotenv").config();
const userRoute = express.Router();

// Register a new user

userRoute.post("/register", handleFileUpload, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      regId,
      department,
      contact,
      qualifications,
      currentlyTeaching,
      actingClassTeacherFor,
      additionalTeachingClasses,
      additionalTeachingDepartments,
      expertise,
      hobbies,
      languages,
    } = req.body;

    // Validate user input
    if (
      !name ||
      !email ||
      !password ||
      !regId ||
      !department ||
      !contact ||
      !qualifications ||
      !currentlyTeaching ||
      !actingClassTeacherFor ||
      !additionalTeachingClasses ||
      !additionalTeachingDepartments ||
      !expertise ||
      !hobbies ||
      !languages
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const existingUser = await User.findOne({ regId });

    if (existingUser) {
      return res.json({
        message: "User already registered with given Register Id ",
      });
    }

    const profilePicture = req.file.buffer.toString("base64");

    // Hash password
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      regId,
      department,
      contact,
      qualifications,
      currentlyTeaching,
      actingClassTeacherFor,
      additionalTeachingClasses,
      additionalTeachingDepartments,
      expertise,
      hobbies,
      languages,
      profilePicture,
    });

    await user.save();

    res.status(201).json({ message: "User registration success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Login user
userRoute.post("/login", async (req, res) => {
  try {
    const { regId, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ regId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(201).json({
      name: user.name,
      email: user.email,
      department: user.department,
      regId: user.regId,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
      currentlyTeaching: user.currentlyTeaching,
      actingClassTeacherFor: user.actingClassTeacherFor,
      contact: user.contact,
      additionalTeachingClasses: user.additionalTeachingClasses,
      additionalTeachingDepartments: user.additionalTeachingDepartments,
      languages: user.languages,
      expertise: user.expertise,
      qualifications: user.qualifications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
userRoute.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();

    // const responseData = users.map((user) => {
    //   // const profilePictureData = user.profilePicture
    //   //   ? Buffer.from(user.profilePicture, "base64")
    //   //   : null;

    //   return {
    //     name: user.name,
    //     email: user.email,
    //     department: user.department,
    //     regId: user.regId,
    //     profilePicture:user.profilePicture
    //   };
    // });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user
userRoute.get("/getuser/:id", getUserById, (req, res) => {
  try {
    res.send(res.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
userRoute.patch("/:id", handleFileUpload, getUserById, async (req, res) => {
  const checkregid = await User.findOne({ regId: req.body.regId });
  const checkemail = await User.findOne({ email: req.body.email });
  if (checkemail === null && checkregid === null) {
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
    if (req.body.password != null) {
      res.user.password = req.body.password;
    }
    if (req.body.regId != null) {
      res.user.regId = req.body.regId;
    }
    if (req.body.department != null) {
      res.user.department = req.body.department;
    }
    if (req.file) {
      res.user.profilePicture = req.file.buffer.toString("base64");
    }
    try {
      const updatedUser = await res.user.save();
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.json({ message: "User already registered with given details" });
  }
});

// Delete a user by ID
userRoute.delete("/:id", getUserById, async (req, res) => {
  try {
    await User.findOneAndDelete({ regId: res.user.regId });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get users by Department
userRoute.get("/:department", async (req, res) => {
  try {
    const department = req.params.department;
    const users = await User.find({ department });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Middleware function to get a user by ID
async function getUserById(req, res, next) {
  let user;
  try {
    user = await User.findOne({ regId: req.params.id });
    if (user == null) {
      return res
        .status(404)
        .json({ message: "No user found with given Registerid" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = userRoute;
