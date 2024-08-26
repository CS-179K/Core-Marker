import mongoSanitize from "express-mongo-sanitize";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user_model.js";
import postRoutes from "./routes/post_route.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  }),
);

dotenv.config();

app.use("/api/upload", postRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("You are connected to Mongodb");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
app.listen(port, () => {
  connectDB();
  console.log("Server port: 5001 ");
});

app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    console.log("create hashed password for user");

    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: newPassword,
    });

    await user.save();

    res.json({ status: "ok" });
    console.log("user saved to database");
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: "Could not save user" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log("Login route hit");
  console.log("Login attempt with data:", req.body);
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  console.log("User found:", user);
  console.log("original password", req.body.password);
  console.log("Password hash from db:", user.password);
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  console.log("Is the password valid?", isPasswordValid);
  if (isPasswordValid) {
    console.log("Password is validated");
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123",
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});