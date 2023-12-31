import axios from "axios";

const SERVER_URL = "https://javavnan-form.vercel.app/api";

// @desc  registerUser
// @route post http://localhost:5000/api/register-user
export const registerUserService = (user, UserId) => {
  const url = `${SERVER_URL}/register-user`;
  return axios.post(url, { user, UserId });
};

// @desc  registerUser
// @route post http://localhost:5000/api/register-user
export const getUserService = (userId) => {
  const url = `${SERVER_URL}/get-user`;
  return axios.post(url, { userId });
};

// @desc  Dinner
// @route post http://localhost:5000/api/dinner
export const dinnerService = (values, UserId, Totall) => {
  const url = `${SERVER_URL}/dinner`;
  return axios.post(url, { values, UserId, Totall });
};

// @desc  Dinner
// @route get http://localhost:5000/api/get-info
export const getInfoService = (userId) => {
  const url = `${SERVER_URL}/get-info`;
  return axios.post(url, { userId });
};

// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const createQRcodeService = (userId) => {
  const url = `${SERVER_URL}/create-QRcode`;
  return axios.post(url, { userId });
};

// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const arriwedUsers = (userId) => {
  const token = localStorage.getItem("admin");
  const url = `${SERVER_URL}/is-arriwed`;
  return axios.post(url, { userId, token });
};

// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const deliverDinner = (userId) => {
  const token = localStorage.getItem("admin");
  const url = `${SERVER_URL}/deliver-dinner`;
  return axios.post(url, { userId, token });
};
// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const getAllUsers = () => {
  const url = `${SERVER_URL}/get-users`;
  return axios.get(url);
};

// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const deleteUser = (userId) => {
  const url = `${SERVER_URL}/delete-user/${userId}`;
  return axios.delete(url);
};

// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const transactionService = (dinner) => {
  const url = `${SERVER_URL}/pay-up`;
  return axios.post(url, dinner);
};

// @desc  QRcode
// @route get http://localhost:5000/api/create-QRcode
export const paymentresponseService = (query) => {
  const url = `${SERVER_URL}/response`;
  return axios.post(url, query, {
    "Content-Type": "application/json",
    Accept: "application/json",
  });
};
