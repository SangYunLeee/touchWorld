import { Routes, Route } from "react-router-dom";

import './App.css';
import Navbar from './component/Navbar'
import Home from './component/Home'
import NewPost from './component/NewPost'
import HomeTitle from './component/HomeTitle'
import "bootstrap/dist/css/bootstrap.min.css";
import "quill/dist/quill.snow.css";

function App() {
  return (
    <div className="App">
      <HomeTitle />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="post/new" element={<NewPost />} />
      </Routes>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;