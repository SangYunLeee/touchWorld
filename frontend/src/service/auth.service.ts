import axios from "axios";
import authHeader from "./auth.header";
import IUserInfo from "../types/User";
const API_URL = "http://localhost:8080/api/auth/";

const register = (username : string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};
const login = async (username : string, password : string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
const getCurrentUser = () : (IUserInfo | null) => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    return JSON.parse(currentUser);
  } else {
    return null;
  }
};

const updateUserInfo = async (userInfo : IUserInfo) => {
  return axios
      .put(API_URL + "userinfo", userInfo, {headers: authHeader()})
        .then((response) => {
          const {email, nickname} = response.data;
          localStorage.setItem("user", JSON.stringify({...getCurrentUser(), email, nickname}));
        })
        .catch((err : Error) => {
          console.log(err);
        })
};

interface PasswordSet {
  oldPassword: string;
  newPassword: string;
}

const updatePassword = async (passwordSet : PasswordSet) => {
  return axios
      .put(API_URL + "password", {
        oldPassword : passwordSet.oldPassword,
        newPassword : passwordSet.newPassword
      }, {headers: authHeader()});
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    updateUserInfo,
    updatePassword
};
export default AuthService;