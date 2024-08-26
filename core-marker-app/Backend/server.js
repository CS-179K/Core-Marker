const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For password hashing
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser"); // To parse JSON request bodies

const mongoDB_ConnectionString =
  "mongodb+srv://Maker424:CS179K-Project-Legend@core-marker-database.lsbe7.mongodb.net/?retryWrites=true&w=majority&appName=Core-Marker-Database";

mongoose
  .connect(mongoDB_ConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Core-Marker MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON

app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  }),
);

// Mock User Schema for demonstration
/*const userSchema = new mongoose.Schema({
  email: String,
  password: String, // This should be hashed in a real application
}); */

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true} 
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post("/api/signup", async (req, res) => {
  const { username, email, password, } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password here

    // Create a new user
    const newUser = new User({
      username,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If authentication is successful, send a success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
