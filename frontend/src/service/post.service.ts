import http from "../http-common";
import authHeader from "./auth.header";

const getAll = () => {
  return http.get("/post");
};
const get = (id : string) => {
  return http.get(`/post/${id}`);
};

interface Post {
  title: string,
  description: string
};

const create = (data : Post) => {
  return http.post("/post", data, {headers: authHeader()});
};
const update = (id : string, data : Post) => {
  return http.put(`/post/${id}`, data, {headers: authHeader()});
};
const remove = (id : string) => {
  return http.delete(`/post/${id}`, {headers: authHeader()});
};
const removeAll = () => {
  return http.delete(`/post`, {headers: authHeader()});
};
const findByTitle = (title : string) => {
  return http.get(`/post?title=${title}`);
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