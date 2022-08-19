import axios from "axios";
import { IAuth } from "../interfaces/IAuth";

const API_URL: string = "/api/users/";

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

// logout : Logs out the user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
