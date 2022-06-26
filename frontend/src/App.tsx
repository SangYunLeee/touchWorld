import { Routes, Route, useParams } from "react-router-dom";

import "./App.css";
import "./public.css";
import Navbar from "./component/Navbar"; // @ts-ignore
import Home from "./component/Home";
import NewPost from "./component/NewPost";
import HomeTitle from "./component/HomeTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import ProfilePage from "./component/ProfilePage";
import PostDetailPage from "./component/PostDetailPage";
import ProfilePwdUpdatePage from "./component/ProfilePwdUpdatePage";
import Sidebar from "./component/Sidebar";
import { Container } from "react-bootstrap";
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
  return (
    <div className="App">
      <div className="body">
        <HomeTitle />
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
      </div>
    </div>
  );
}

export default App;
