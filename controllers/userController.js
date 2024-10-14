const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// User Signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received data:", username, email, password); // Check incoming data
  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("Creating new user...");
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log("User created:", user);
    res
      .status(201)
      .json({ message: "User created successfully", user_id: user._id });
  } catch (error) {
    console.error("Error during signup:", error); // Log error details
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "Invalid username and password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, message: "Invalid username and password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
