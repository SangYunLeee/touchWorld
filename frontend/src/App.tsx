import * as React from "react";

import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
  useRoutes,
} from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import NewPost from "./component/NewPost";
import HomeTitle from "./component/HomeTitle";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import ProfilePage from "./component/ProfilePage";
import PostDetailPage from "./component/PostDetailPage";
import ProfilePwdUpdatePage from "./component/ProfilePwdUpdatePage";
import { UserInfoProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categorylist.context";
import Sidebar from "./component/Sidebar";
import { Container } from "react-bootstrap";
import { QueryParamProvider } from "use-query-params";

// CSS
import "./App.css";
import "./public.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PostDetail = () => {
  let { id } = useParams();
  return <PostDetailPage postId={id} />;
};

const PostEdit = () => {
  let { id } = useParams();
  return <NewPost postId={id} isEditMode={true} />;
};

const ProfileEdit = () => {
  return <ProfilePage editMode={true} />;
};

function App() {
  let routes: RouteObject[];
  routes = [
    {
      children: [
        { path: "/author/:authorId/*", element: <MainContext /> },
        { path: "/*", element: <MainContext /> },
      ],
    },
  ];

  let element = useRoutes(routes);

  function MainContext() {
    return (
      <>
        <Navbar />
        <Container fluid>
          <div className="row">
            <Container className="col-3 min-vh-100 d-none d-md-flex">
            <Sidebar />
            </Container>
            <Container
              className="col-12 col-md-6 d-flex justify-content-center h-fit-content"
              fluid
            >
              <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/edit" element={<ProfileEdit />} />
                <Route
                  path="profile/pwdupdate"
                  element={<ProfilePwdUpdatePage />}
                />
                <Route path="post">
                  <Route path="new" element={<NewPost isEditMode={false} />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                  <Route path=":id" element={<PostDetail />} />
                </Route>
              </Routes>
            </Container>
            <Container className="col-3 d-none d-md-block"></Container>
          </div>
        </Container>
      </>
    );
  }

  return (
    <div className="App">
      <div className="body">
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <CategoriesProvider>
            <UserInfoProvider>
              <HomeTitle />
              {element}
            </UserInfoProvider>
          </CategoriesProvider>
        </QueryParamProvider>
      </div>
    </div>
  );
}

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

export default App;
