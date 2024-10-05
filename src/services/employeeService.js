const prisma = require("../config/prismaClient");

const createEmployee = async (data) => {
  const { firstName, lastName, position, email, password, roleId } = data;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      roleId,
    },
  });

  // Membuat employee yang terhubung dengan user
  const employee = await prisma.employee.create({
    data: {
      firstName,
      lastName,
      position,
      userId: user.id,
    },
  });

  return employee;
};

const getEmployees = async () => {
  const employees = await prisma.employee.findMany({
    include: { user: true },
  });

  const employeesWithoutPassword = employees.map((employee) => {
    const { password, ...userWithoutPassword } = employee.user;
    return {
      ...employee,
      user: userWithoutPassword,
    };
  });

  return employeesWithoutPassword;
};

const getEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(id) },
    include: { user: true },
  });

  if (!employee) {
    return null;
  }

  const { password, ...userWithoutPassword } = employee.user;

  return {
    ...employee,
    user: userWithoutPassword,
  };
};

const updateEmployee = async (id, data) => {
  const { firstName, lastName, position, email, password, roleId, userId } =
    data;

  const user = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      email,
      password,
      roleId,
    },
  });

  // Update Employee
  const employee = await prisma.employee.update({
    where: { id: parseInt(id) },
    data: {
      firstName,
      lastName,
      position,
      userId: user.id,
    },
  });

  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await prisma.employee.delete({
    where: { id: parseInt(id) },
  });

  await prisma.user.delete({
    where: { id: employee.userId },
  });

  return employee;
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
