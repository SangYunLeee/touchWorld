import { Routes, Route, useParams } from "react-router-dom";

import './App.css';
import './public.css';
import Navbar from './component/Navbar'
import Home from './component/Home'
import NewPost from './component/NewPost'
import HomeTitle from './component/HomeTitle'
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import ProfilePage from "./component/ProfilePage";
import AddPostPage from "./component/AddPostPage";
import PostDetailPage from "./component/PostDetailPage";

const PostDetail = () => {
  let { id } = useParams();
  return <PostDetailPage postId={id} />;
}

const PostEdit = () => {
  let { id } = useParams();
  return <NewPost postId={id} isEditMode={true} />;
}

function App() {
  return (
    <div className="App">
      <div className="body">
        <HomeTitle />
        <Navbar />
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="post/new" element={<NewPost isEditMode={false} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="post/edit/:id" element={<PostEdit />} />
            <Route path="post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;