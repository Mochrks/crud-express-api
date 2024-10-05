const Register = (data) => {
  const { email, password, role } = data;

  return data;
};

const Login = (data) => {
  const { email, password } = data;
  return data;
};
const CreateEmployee = (data) => {
  const { firstName, lastName, position, email, password, roleId } = data;
  return data;
};
const UpdateEmployee = (data) => {
  const { firstName, lastName, position, email, password, roleId } = data;
  return data;
};

module.exports = {
  Register,
  Login,
  CreateEmployee,
  UpdateEmployee,
};
