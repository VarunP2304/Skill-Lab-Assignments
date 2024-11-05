const express = require("express");
const mongoose = require("mongoose");
const billRoutes = require("./routes/billRoutes");

const app = express();

// MongoDB URI
const MONGODB_URI = "mongodb+srv://varunphariharan:6362718198@public-bill.llvf2.mongodb.net/billsDB";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(express.json());
app.use("/api/bills", billRoutes); // Use bill routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));