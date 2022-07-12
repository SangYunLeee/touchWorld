import axios from "axios";
import authHeader from "./auth.header";
import ICommentType from "../types/CommentType";
import {
  createSearchParams
} from "react-router-dom";

const isLocalhost = (process.env.NODE_ENV === "production")? false : true;

const axiosDefault = axios.create({
  baseURL : (isLocalhost? "http://localhost:5000/" : "/") +
    "api/comment"
});

const create = (data : {text: string, postId: string}) => {
  return axiosDefault.post<ICommentType>("/", data, {headers: authHeader()});
};

const PostService = {
  create,
};
export default PostService;