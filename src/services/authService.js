const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaClient");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (email, password, role) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: {
        connectOrCreate: { where: { name: role }, create: { name: role } },
      },
    },
  });

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role.name },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const { password: _, ...userWithoutPassword } = user;
  return { token, user: userWithoutPassword };
};

module.exports = {
  register,
  login,
};
