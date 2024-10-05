require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const employeeRoutes = require("./routes/employeeRoutes");
const { connectDB, disconnectDB } = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cek connection db
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
