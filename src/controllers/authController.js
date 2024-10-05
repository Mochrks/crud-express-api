const AuthService = require("../services/authService");
const { successResponse, errorResponse } = require("../dto/responseDTO");
const { Register, Login } = require("../dto/requestDTO");

const register = async (req, res) => {
  try {
    const registerData = Register(req.body);

    const result = await AuthService.register(
      registerData.email,
      registerData.password,
      registerData.role
    );
    res.json(successResponse(result, "User registered successfully"));
  } catch (error) {
    res.status(400).json(errorResponse(error.message || "Registration failed"));
  }
};

const login = async (req, res) => {
  try {
    const loginData = Login(req.body);

    const result = await AuthService.login(loginData.email, loginData.password);
    res.json(successResponse(result, "Login successful"));
  } catch (error) {
    res.status(400).json(errorResponse(error.message || "Login failed"));
  }
};

module.exports = {
  register,
  login,
};
