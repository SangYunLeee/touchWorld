import http from "../http-common";
import axios from "axios";
import authHeader from "./auth.header";
import IPostData from "../types/Post";
import {
  createSearchParams
} from "react-router-dom";

const isLocalhost = (process.env.NODE_ENV == "production")? false : true;

const axiosDefault = axios.create({
  baseURL : (isLocalhost? "http://localhost:5000/" : "/") +
    "api/post"
});

function getAll(post : {author?, title?, category?}) {
  const query = createSearchParams(post);
  const params = new URLSearchParams(post).toString();
  console.log("getDB by params: ", post);
  return axiosDefault.get<IPostData[]>(`/?${query}`);
};

const get = (id : string) => {
  return axiosDefault.get<IPostData>(`/${id}`);
};

const create = (data : IPostData) => {
  return axiosDefault.post<IPostData>("/", data, {headers: authHeader()});
};
const update = (id : string, data : IPostData) => {
  return axiosDefault.put(`/${id}`, data, {headers: authHeader()});
};
const remove = (id : string) => {
  return axiosDefault.delete(`/${id}`, {headers: authHeader()});
};
const removeAll = () => {
  return axiosDefault.delete("/", {headers: authHeader()});
};
const findByTitle = (title : string) => {
  return axiosDefault.get<Array<IPostData>>(`/?title=${title}`);
};
const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
export default PostService;