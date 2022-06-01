import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
import "./ProfilePage.css";

const c_userInfo_container =
  "profilepage col-xs-12 col-sm-10 col-md-8 col-lg-6 col-12 mx-auto py-3 mw-600 border bg-gray";
const c_userInfo_edit_btn = "btn bg-secondary position-absolute text-light";

const Profile = (props) => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [user, setUser] = useState(currentUser);
  var initEditMode = props.editMode;
  const [editMode, setEditMode] = useState(initEditMode);

  useEffect(() => {
    console.log('useEffect');
    setEditMode(props.editMode);
    setUser(currentUser);
  }, [props.editMode, currentUser]);

  const setInputValue = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const goToEditProfile = () => {
    navigate('/profile/edit');
  }

  const goToPwdUpdate = () => {
    navigate('/profile/pwdupdate');
  }

  const onClickUpdateUserInfo = () => {
    console.log("test onClickUpdateUserInfo")
    AuthService.updateUserInfo({nickname: user.nickname, email: user.email})
      .then(() => {
        navigate('/profile');
        window.location.reload();
      })
  }

  return (
    <div className={`${c_userInfo_container} profileForm px-3 position-relative`}>
      <header className="jumbotron">
        <h3>{editMode? "내 정보 변경" : "내 정보" }</h3>
        <hr className="solid"></hr>
      </header>
      <p>
        <label>아이디 </label>
        {user.username}
      </p>
      <p>
        <label> 닉네임 </label>
        {editMode ? (
          <input
            placeholder="닉네임을 정해주세요"
            value={user.nickname && user.nickname}
            onChange={setInputValue}
            name="nickname"
          />
        ) : user.nickname ? (
          user.nickname
        ) : (
          "닉네임 없음"
        )}
      </p>
      <p>
        <label>이메일 </label>
        {editMode ? (
          <input
            placeholder="이메일을 정해주세요"
            value={user.email && user.email}
            onChange={setInputValue}
            name="email"
          />
        ) : user.email ? (
          user.email
        ) : (
          "이메일 없음"
        )}
      </p>
      <strong>권한</strong>
      <ul>
        {user.roles &&
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      {editMode ? (
        <p className="p-0 m-0" style={{ height: "2.0rem" }}>
          <button className={c_userInfo_edit_btn} style={{ right: "15px" }}
            onClick={onClickUpdateUserInfo}
          >
            변경 완료
          </button>
        </p>
      ) : (
        [
          <p className="p-0 m-0" style={{ height: "2.0rem" }}
            key="pwdChg"
          >
            <button className={c_userInfo_edit_btn} style={{ right: "15px" }}
              onClick={goToPwdUpdate}
            >
              비밀번호 변경
            </button>
          </p>,
          <p className="p-0 m-3" style={{ height: "2.0rem" }}
          key="infoChg"
          >
            <button className={c_userInfo_edit_btn} style={{ right: "15px" }}
              onClick={goToEditProfile}
            >
              개인 정보 변경
            </button>
          </p>,
        ]
      )}
    </div>
  );
};

export default Profile;
