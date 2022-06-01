import axios from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/api/auth/";
const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};
const login = async (username, password) => {
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
    return JSON.parse(localStorage.getItem("user"));
};

const updateUserInfo = async (userInfo) => {
  return axios
      .put(API_URL + "userinfo", {
        email: userInfo.email,
        nickname: userInfo.nickname
      }, {headers: authHeader()})
        .then((response) => {
          const {email, nickname} = response.data;
          localStorage.setItem("user", JSON.stringify({...getCurrentUser(), email, nickname}));
        })
        .catch(err => {
          console.log(err);
        })
};

const updatePassword = async ({oldPassword, newPassword}) => {
  return axios
      .put(API_URL + "password", {
        oldPassword,
        newPassword
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