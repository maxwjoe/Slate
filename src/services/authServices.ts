import axios from "axios";
import { IAuth } from "../interfaces/IAuth";

const API_URL: string = `${process.env.REACT_APP_API_BASE_ENDPOINT}/api/users/`;
console.log(API_URL);

// register : Registers the user in the backend
const register = async (userData: IAuth) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data as IAuth;
};

// login :logs the user in by contacting backend and getting data
const login = async (userData: IAuth) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data as IAuth;
};

// updateUser : Updates the user in the backend
const updateUser = async (userObj: IAuth, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(API_URL, userObj, config);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// logout : Logs out the user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  updateUser,
  login,
};

export default authService;
