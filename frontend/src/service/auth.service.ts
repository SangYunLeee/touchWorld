import axios from "axios";
import authHeader from "./auth.header";
import IUserInfo from "../types/User";

const isLocalhost = (process.env.NODE_ENV === "production")? false : true;

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

const axiosDefault = axios.create({
  baseURL : (isLocalhost? "http://localhost:5000/" : "/") +
    "api/auth"
});

console.log("process.env.baseURL: ", process.env.baseURL);

const register = (username : string, email: string, password: string) => {
    return axiosDefault.post("/signup", {
        username,
        email,
        password,
    });
};
const login = async (username : string, password : string) => {
    return axiosDefault
        .post("/signin", {
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
const getCurrentUser = () : (IUserInfo | null) => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    return JSON.parse(currentUser);
  } else {
    return null;
  }
};

const updateUserInfo = async (userInfo : IUserInfo) => {
  return axiosDefault
      .put("/userinfo", userInfo, {headers: authHeader()})
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
  return axiosDefault
      .put("/password", {
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