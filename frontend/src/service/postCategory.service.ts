// import axios from "../axios-common";
import axios from "axios";
import authHeader from "./auth.header";


const isLocalhost = (process.env.NODE_ENV == "production")? false : true;

const axiosDefault = axios.create({
  baseURL : (isLocalhost? "http://localhost:5000/" : "/") +
    "api/postCategory"
});

const API_URL = `${axios.defaults.baseURL}/api/postCategory`

const create = (data : {title : string}) => {
  console.log(API_URL, data);
  var rtn = axiosDefault.post("/", data, {headers: authHeader()});
  console.log("get end");
  return rtn;
};

const findByUserId = (username : string) => {
  return axiosDefault.get(`/?username=${username}`);
};

const deleteOne = (id : string) => {
  console.log(API_URL, id);
  var rtn = axiosDefault.delete(`/${id}`, {headers: authHeader()});
  console.log("get end");
  return rtn;
};

const PostCategoryService = {
  create,
  findByUserId,
  deleteOne
};
export default PostCategoryService;