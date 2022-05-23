import { Routes, Route } from "react-router-dom";

import './App.css';
import Navbar from './component/Navbar'
import Home from './component/Home'
import NewPost from './component/NewPost'
import HomeTitle from './component/HomeTitle'
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";


function App() {
  return (
    <div className="App">
      <HomeTitle />
      <Navbar />
      <div className="container">
      <Routes>
        <Route index element={<Home />} />
        <Route path="post/new" element={<NewPost />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      </div>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;