import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
import "./ProfilePwdUpdatePage.css";

const c_profilePwdUpdatePage =
  "profilePwdUpdatePage border bg-gray";
const c_userInfo_edit_btn = "btn bg-secondary position-absolute text-light";

const ProfilePwdUpdatePage = (props) => {
  const navigate = useNavigate();
  var currentUser = AuthService.getCurrentUser();
  currentUser.newPassword = "";
  currentUser.oldPassword = "";

  const [user, setUser] = useState(currentUser);
  const [warningMessage, setWarningMessage] = useState("");

  const setInputValue = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onClickedUpdatePwdBtn = () => {
    console.log("test onClickedUpdatePwdBtn");
    if (user.oldPassword !== user.oldPassword2) {

    }
    AuthService.updatePassword({
      oldPassword: user.oldPassword,
      newPassword: user.newPassword
    })
      .then(() => {
      navigate("/profile");
      window.location.reload();
    })
      .catch((err) => {
        const msg = "변경에 실패했습니다"
        setWarningMessage(msg);
      })
    ;
  };

  return (
    <div className={`${c_profilePwdUpdatePage} profileForm p-3 position-relative`} style={{width: '450px'}}>
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
          name="oldPassword"
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
          name="oldPassword2"
        />
      </p>
      <p>
        <label className='me-2 mt-2'>변경 비밀번호</label>
        <input
          placeholder="변경할 비밀번호를 입력해주세요"
          onChange={setInputValue}
          name="newPassword"
          type='password'
          className="mt-2"
        />
      </p>
      {
        warningMessage && (
          <div> {warningMessage} </div>
        )
      }
      <p className="p-0 m-0" style={{ height: "4.0rem" }}>
        <button
          className={c_userInfo_edit_btn}
          style={{ right: "15px", bottom: "15px" }}
          onClick={onClickedUpdatePwdBtn}
        >
          변경 완료
        </button>
      </p>
    </div>
  );
};

export default ProfilePwdUpdatePage;
