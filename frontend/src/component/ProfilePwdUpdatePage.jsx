import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
import "./ProfilePwdUpdatePage.css";

const c_profilePwdUpdatePage =
  "profilePwdUpdatePage col-xs-12 col-sm-10 col-md-8 col-lg-6 col-12 mx-auto py-3 mw-600 border bg-gray";
const c_userInfo_edit_btn = "btn bg-secondary position-absolute text-light";

const ProfilePwdUpdatePage = (props) => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const [user, setUser] = useState(currentUser);
  var initEditMode = props.editMode;

  useEffect(() => {
    setUser(currentUser);
  }, []);

  const setInputValue = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const goToEditProfile = () => {
    navigate("/profile/edit");
  };

  const onClickUpdateUserInfo = () => {
    console.log("test onClickUpdateUserInfo");
    AuthService.updateUserInfo({
      nickname: user.nickname,
      email: user.email,
    }).then(() => {
      navigate("/profile");
      window.location.reload();
    });
  };

  return (
    <div className={`${c_profilePwdUpdatePage} profileForm px-3 position-relative`}>
      <header className="jumbotron">
        <h3>비밀번호 변경</h3>
        <hr className="solid"></hr>
      </header>
      <div>
        <label className="me-2">기존 비빌번호 입력</label>
        <input
          type='password'
          placeholder="기존 비밀번호를 입력해주세요"
          onChange={setInputValue}
          name="oldPassward"
        />
      </div>
      <p>
        <label className="me-2 mt-2">
          기존 비빌번호 재입력
        </label>
        <input
          type='password'
          placeholder="다시 입력해주세요"
          onChange={setInputValue}
          name="oldPassward2"
        />
      </p>
      <p>
        <label className='me-2 mt-2'>변경 비밀번호</label>
        <input
          placeholder="변경할 비밀번호를 입력해주세요"
          onChange={setInputValue}
          name="newPassward"
          className="mt-2"
        />
      </p>
      <p className="p-0 m-0" style={{ height: "4.0rem" }}>
        <button
          className={c_userInfo_edit_btn}
          style={{ right: "15px", bottom: "15px" }}
          onClick={onClickUpdateUserInfo}
        >
          변경 완료
        </button>
      </p>
    </div>
  );
};

export default ProfilePwdUpdatePage;
