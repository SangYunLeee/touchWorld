import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
import "./AuthPage.css";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from 'react-validation/build/form';
import catImg from "../asset/cat_noimage.jpg";

const required = (value : string) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        입력을 안하셨네~!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef<typeof Form>();
  const checkBtn = useRef<typeof CheckButton>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e : React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current?.validateAll();

    if (checkBtn.current?.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate(`/?author=${username}`);
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage col-md-12">
      <div className="card card-container">
        <img
          style={{borderStyle:"solid", borderWidth:"1px", borderColor: "DarkGray"}}
          src={catImg}
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block btn-success mt-3" style={{float: "right"}} disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>로그인</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton className='' style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
