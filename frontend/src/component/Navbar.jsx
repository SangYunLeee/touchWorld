import React from 'react'
import { Link } from "react-router-dom";

import catImg from "../asset/cat_navbar.png";
const navbar = "justify-content-center d-flex bg-light w-100 mb-4 pb-2"
const navbar_content = "col-12 bg-light navbar navbar-expand-sm navbar-light bg-light p-0 mt-1 mb-1"
const Img_class = "d-inline-block mr-3"
const nav_item = "nav-link text-secondary text-center"

export default function Navbar() {
  return (
      <div className={navbar}>
          <nav className={navbar_content} style={{maxWidth: '800px'}}>
              <img height="40" className={Img_class} src={catImg} alt=""/>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_toggler"
                  aria-controls="navbar_toggler" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbar_toggler">
                  <Link className={`${nav_item} active`} to="/">Home</Link>
                  <Link className={`${nav_item} me-auto`} to="/post/new">새 글 올리기</Link>
                  <Link className={`${nav_item} pl-3 pr-3`} to="/login">로그인쓰</Link>
                  <Link className={`${nav_item} pl-3 pr-3`} to="/register">회원가입</Link>
              </div>
          </nav>
      </div>
  )
}