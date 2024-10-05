const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// Route with verification tokens
router.post("/", verifyToken, createEmployee);
router.get("/", verifyToken, getEmployees);
router.get("/:id", verifyToken, getEmployeeById);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

module.exports = router;
