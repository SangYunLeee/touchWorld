import http from "../http-common";
import authHeader from "./auth.header";
import IPostData from "../types/Post";

function getAll(post : {author?, title?, category?}) {
  if (!post?.category) {
    post = {};
  }
  const params = new URLSearchParams(post).toString();
  console.log("getDB by params: ", params);
  return http.get<IPostData[]>(`/post?${params}`);
};

const get = (id : string) => {
  return http.get<IPostData>(`/post/${id}`);
};

const create = (data : IPostData) => {
  return http.post<IPostData>("/post", data, {headers: authHeader()});
};
const update = (id : string, data : IPostData) => {
  return http.put(`/post/${id}`, data, {headers: authHeader()});
};
const remove = (id : string) => {
  return http.delete(`/post/${id}`, {headers: authHeader()});
};
const removeAll = () => {
  return http.delete(`/post`, {headers: authHeader()});
};
const findByTitle = (title : string) => {
  return http.get<Array<IPostData>>(`/post?title=${title}`);
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