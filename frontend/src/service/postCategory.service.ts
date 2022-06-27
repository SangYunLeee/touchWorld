import http from "../http-common";
import authHeader from "./auth.header";

const serviceTarget = "/postCategory"

const create = (data : {title : string}) => {
  console.log(serviceTarget, data);
  var rtn = http.post(serviceTarget, data, {headers: authHeader()});
  console.log("get end");
  return rtn;
};

const findByUserId = (username : string) => {
  return http.get(`${serviceTarget}?username=${username}`);
};

const deleteOne = (id : string) => {
  console.log(serviceTarget, id);
  var rtn = http.delete(serviceTarget + `/${id}`, {headers: authHeader()});
  console.log("get end");
  return rtn;
};

const PostCategoryService = {
  create,
  findByUserId,
  deleteOne
};
export default PostCategoryService;