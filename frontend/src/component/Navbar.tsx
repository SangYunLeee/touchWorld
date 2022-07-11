import React, { useEffect, useContext } from "react";
import IUserInfo from "../types/User";
import { UserContext, UserDispatchContext } from "../contexts/user.context";
import { Link } from "react-router-dom";
import useNavigateDefault from "../helper/useNavigateDefault";
import AuthService from "../service/auth.service";
import NavbarB from "react-bootstrap/Navbar";
import catImg from "../asset/cat_navbar.png";
const navbar = "justify-content-center d-flex bg-light w-100 mb-4 pb-2";
const navbar_content =
  "col-12 bg-light navbar navbar-expand-sm navbar-light p-0  mb-1 px-2";
const Img_class = "d-inline-block mr-3";
const nav_item = "nav-link text-secondary text-center";

export default function Navbar() {
  const currentUser = useContext(UserContext);
  const userDispatch = useContext(UserDispatchContext);
  const navigateDefault = useNavigateDefault();

  useEffect(() => {
    var user: IUserInfo | null;
    user = AuthService.getCurrentUser();
    if (user) {
      userDispatch?.({ type: "UPDATE", ...user });
    }
  }, []);

  const logOut = () => {
    userDispatch?.({ type: "LOGOUT" });
  };

  const NoneUserNavItems = () => {
    return (
      <>
        <Link key="login" className={`${nav_item}`} to="/login">
          로그인쓰
        </Link>
        <Link key="regist" className={`${nav_item}`} to="/register">
          회원가입
        </Link>
      </>
    );
  };

  const UserNavItems = () => {
    return (
      <>
        <Link key="username" className={`${nav_item}`} to={`/author/${currentUser?.username}`}>
          {currentUser?.username}
        </Link>
        <button key="profile" className={`${nav_item}`}
          onClick={navigateDefault("/profile")}
        >
          내 정보
        </button>
        <button key="logout" className={`${nav_item}`} onClick={() => {
          logOut();
          navigateDefault("/");
        }}>
          로그 아웃
        </button>
      </>
    );
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
          <div className="me-auto"></div>
          {!currentUser && <NoneUserNavItems />}
          {currentUser && <UserNavItems />}
        </NavbarB.Collapse>
      </NavbarB>
    </div>
  );
}
