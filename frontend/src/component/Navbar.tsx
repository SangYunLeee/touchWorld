import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../service/auth.service";
import NavbarB from "react-bootstrap/Navbar";
import catImg from "../asset/cat_navbar.png";
const navbar = "justify-content-center d-flex bg-light w-100 mb-4 pb-2";
const navbar_content =
  "col-12 bg-light navbar navbar-expand-sm navbar-light p-0  mb-1 px-2";
const Img_class = "d-inline-block mr-3";
const nav_item = "nav-link text-secondary text-center";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    var user;
    try {
      user = AuthService.getCurrentUser();
    } catch {}
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const NoneUserNavItems = () => {
    return <>
      <Link key="login" className={`${nav_item}`} to="/login">
        로그인쓰
      </Link>
      <Link key="regist" className={`${nav_item}`} to="/register">
        회원가입
      </Link>
    </>;
  };

  const UserNavItems = () => {
    return <>
      <Link key="username" className={`${nav_item}`} to="/profile">
        {currentUser.username}
      </Link>
      <Link key="profile" className={`${nav_item}`} to="/profile">
        내 정보
      </Link>
      <Link key="logout" className={`${nav_item}`} to="/" onClick={logOut}>
        로그 아웃
      </Link>
    </>;
  };

  return (
    <div className={navbar} style={{ borderBottom: "1px solid #e5e5e5" }}>
      <NavbarB
        className={navbar_content}
        bg="light"
        expand="lg"
        style={{ maxWidth: "800px" }}
      >
        <img height="40" className={Img_class} src={catImg} alt="" />

        <NavbarB.Toggle aria-controls="basic-navbar-nav" />
        <NavbarB.Collapse id="basic-navbar-nav">
          <Link className={`${nav_item} active`} to="/">
            Home
          </Link>
          {currentUser && (
            <Link className={`${nav_item}`} to="/post/new">
              새 글 올리기
            </Link>
          )}
          <div className="me-auto"></div>
          {!currentUser && <NoneUserNavItems />}
          {currentUser && <UserNavItems />}
        </NavbarB.Collapse>
      </NavbarB>
    </div>
  );
}
