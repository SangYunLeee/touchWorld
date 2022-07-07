import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../service/auth.service";
import "./AuthPage.css";
import catImg from "../asset/cat_noimage.jpg";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        비어있는 칸이 있어요~!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        이메일이 잘못 적힌 것 같아요
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        아이디를 3~20칸 사이로 적어주세요
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 0 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        비밀번호는 1~ 40 자리 사이로 적어주세요
      </div>
    );
  }
};
const Register = () => {
  const form = useRef<typeof Form>();
  const checkBtn = useRef<typeof CheckButton>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current?.validateAll();
    if (checkBtn.current?.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage("회원가입이 되었습니다~! \n로그인 페이지로 이동해주세요");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div className="registerPage col-md-12">
      <div className="card card-container">
        <img
          src={catImg}
          alt="profile-img"
          style={{borderStyle:"solid", borderWidth:"1px", borderColor: "DarkGray"}}
          className="profile-img-card"
        />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">아이디</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-success btn-block mt-3" style={{float: "right"}}>회원가입</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
                style={{whiteSpace: "pre-wrap"}}
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Register;