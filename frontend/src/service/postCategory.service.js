import http from "../http-common";
import authHeader from "./auth.header";

const serviceTarget = "/postCategory"

const create = data => {
  console.log(serviceTarget, data);
  var rtn = http.post(serviceTarget, data, {headers: authHeader()});
  console.log("get end");
  return rtn;
};

const findByUserId = userId => {
  return http.get(`${serviceTarget}?userId=${userId}`);
};
const PostCategoryService = {
  create,
  findByUserId
};
export default PostCategoryService;