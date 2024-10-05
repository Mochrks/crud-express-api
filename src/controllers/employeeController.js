const {
  successResponse,
  errorResponse,
  successResponseGetAllData,
} = require("../dto/responseDTO");
const employeeService = require("../services/employeeService");

// CREATE
const createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.json(successResponse(employee, "Employee created successfully"));
  } catch (error) {
    res
      .status(400)
      .json(errorResponse(error.message || "Failed to create employee"));
  }
};

// GET ALL
const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    const totalData = employees.length;
    res.json(
      successResponseGetAllData(
        employees,
        "Employees retrieved successfully",
        200,
        totalData
      )
    );
  } catch (error) {
    res
      .status(400)
      .json(errorResponse(error.message || "Failed to retrieve employees"));
  }
};

//  GET BY ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json(errorResponse("Employee not found", 404));
    }

    res.json(successResponse(employee, "Employee retrieved successfully"));
  } catch (error) {
    res
      .status(400)
      .json(errorResponse(error.message || "Failed to retrieve employee"));
  }
};

// UPDATE
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await employeeService.updateEmployee(id, {
      ...req.body,
    });
    res.json(successResponse(employee, "Employee updated successfully"));
  } catch (error) {
    res
      .status(400)
      .json(errorResponse(error.message || "Failed to update employee"));
  }
};

// DELETE
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await employeeService.deleteEmployee(id);
    res.json(successResponse(null, "Employee deleted successfully"));
  } catch (error) {
    res
      .status(400)
      .json(errorResponse(error.message || "Failed to delete employee"));
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
