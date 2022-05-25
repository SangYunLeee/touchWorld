import http from "../http-common";
import authHeader from "./auth.header";

const getAll = () => {
  return http.get("/post");
};
const get = id => {
  return http.get(`/post/${id}`);
};
const create = data => {
  return http.post("/post", {...data, headers: authHeader()});
};
const update = (id, data) => {
  return http.put(`/post/${id}`, data);
};
const remove = id => {
  return http.delete(`/post/${id}`);
};
const removeAll = () => {
  return http.delete(`/post`);
};
const findByTitle = title => {
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