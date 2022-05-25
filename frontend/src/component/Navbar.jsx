import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../service/auth.service";
import catImg from "../asset/cat_navbar.png";
const navbar = "justify-content-center d-flex bg-light w-100 mb-4 pb-2"
const navbar_content = "col-12 bg-light navbar navbar-expand-sm navbar-light bg-light p-0 mt-1 mb-1"
const Img_class = "d-inline-block mr-3"
const nav_item = "nav-link text-secondary text-center"


export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const NoneUserNavItems = () => {
    return [
      <Link key="login" className={`${nav_item}`} to="/login">로그인쓰</Link>,
      <Link key="regist" className={`${nav_item}`} to="/register">회원가입</Link>
    ]
  }

  const UserNavItems = () => {
    return [
      <Link key="username" className={`${nav_item}`} to="/profile">{currentUser.username}</Link>,
      <Link key="profile" className={`${nav_item}`} to="/profile">내 정보</Link>,
      <Link key="logout" className={`${nav_item}`} to="/" onClick={logOut}>로그 아웃</Link>
    ]
  }

  return (
    <div className={navbar}>
      <nav className={navbar_content} style={{ maxWidth: '800px' }}>
        <img height="40" className={Img_class} src={catImg} alt="" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_toggler"
          aria-controls="navbar_toggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbar_toggler">

          <Link className={`${nav_item} active`} to="/">Home</Link>
          {currentUser && (
            <Link className={`${nav_item}`} to="/post/new">새 글 올리기</Link>
          )}
          <div className="me-auto"></div>
          {!currentUser && <NoneUserNavItems />}
          {currentUser && <UserNavItems />}
        </div>
      </nav>
    </div>
  )
}