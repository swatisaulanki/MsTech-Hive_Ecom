import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "../config/db.js";   // default import (function)
import User from "../models/User.js";

const run = async () => {
  try {
    await connectDB();   // call the function directly

    const email = process.env.ADMIN_EMAIL;
    const pass  = process.env.ADMIN_PASSWORD;
    if (!email || !pass) {
      console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
      process.exit(1);
    }

    let admin = await User.findOne({ email });
    if (admin) {
      console.log("Admin exists:", email);
      process.exit(0);
    }

    admin = new User({ name: "Admin", email, password: pass, role: "admin" });
    await admin.save();
    console.log("Admin created:", email);
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

run();
