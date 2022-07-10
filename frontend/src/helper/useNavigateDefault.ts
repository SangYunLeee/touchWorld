
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

function useNavigateDefault() {
  let navigate = useNavigate();
  let { authorId } = useParams();
  let location = useLocation();
  let prefix = "";
  if (authorId) {
    prefix = `/author/${authorId}`;
  }
  return function (
    path: string,
    { query }: { query: boolean } = { query: true }
  ) {
    return function () {
      navigate(`${prefix}${path}${query ? location.search : ""}`);
    };
  };
}

export default useNavigateDefault;