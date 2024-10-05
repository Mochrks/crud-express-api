const successResponse = (data, message = "Success", statusCode = 200) => {
  return {
    data,
    status: "success",
    statusCode,
    message,
  };
};
const successResponseGetAllData = (
  data,
  message = "Success",
  statusCode = 200,
  totalData = 0
) => {
  return {
    totalData,
    data,
    status: "success",
    statusCode,
    message,
  };
};

const errorResponse = (message = "Error", statusCode = 500) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

module.exports = {
  successResponse,
  errorResponse,
  successResponseGetAllData,
};
