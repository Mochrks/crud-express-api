const express = require("express");
const AuthController = require("../controllers/authController");
const validateRequest = require("../middlewares/validationMiddleware");
const { registerSchema, loginSchema } = require("../utils/validationSchema");

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);
router.post("/login", validateRequest(loginSchema), AuthController.login);

module.exports = router;
