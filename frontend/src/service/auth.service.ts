import axios from "axios";
import authHeader from "./auth.header";
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
            if (response.data.accessToken) {
              console.log(JSON.stringify(response.data));
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user") || "");
};

interface UserInfo {
  email: string;
  nickname: string;
}

const updateUserInfo = async (userInfo : UserInfo) => {
  return axios
      .put(API_URL + "userinfo", {
        email: userInfo.email,
        nickname: userInfo.nickname
      }, {headers: authHeader() || ''})
        .then((response) => {
          const {email, nickname} = response.data;
          localStorage.setItem("user", JSON.stringify({...getCurrentUser(), email, nickname}));
        })
        .catch(err => {
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