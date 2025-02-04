import React, { useState } from "react";
import Header from "../../component/header/header.js";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    user_id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.user_id) errors.user_id = "아이디를 입력해주세요";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "올바른 이메일 주소를 입력해주세요";
    if (!formData.password || formData.password.length < 8)
      errors.password = "비밀번호는 영문,숫자 8자리 이상이어야 합니다";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "비밀번호를 다시 확인해주세요";
    return errors;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 프론트엔드에서 입력된 폼 데이터 확인
    console.log("회원가입 폼 데이터:", formData);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        // 응답 본문을 텍스트로 확인
        const responseText = await response.text(); // 텍스트로 응답 받기
        console.log("응답 본문:", responseText);
        if (!response.ok) {
            throw new Error(`회원가입 실패: ${responseText}`);
        }

        alert("회원가입 성공!");
        navigate("/signup/success");
    } catch (error) {
        console.error("Error:", error);
        alert("회원가입 중 오류가 발생했습니다: " + error.message);
    }
};


  return (
    <div>
      <Header />
      <img
        src="/img/monami_background.png"
        alt="로그인 배경 이미지"
        className="background"
      />
      <div className="square-box">
        <span className="signup">회원가입</span>
<div className="SignupInputContainer">
<div className="signupTitle">아이디</div>
        <input
          type="text"
          name="user_id"
          placeholder="monami"
          className="signUpInput"
          value={formData.user_id}
          onChange={handleInputChange}
        />
        {errors.user_id && (
          <div className="errorMessage">{errors.user_id}</div>
        )}
</div>
        
<div className="SignupInputContainer">
<div className="signupTitle">이메일주소</div>
        <input
          type="email"
          name="email"
          placeholder="예: Email0000@monami.com"
          className="signUpInput"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="errorMessage">{errors.email}</div>}
</div>
       
        <div className="SignupInputContainer">
        <div className="signupTitle">비밀번호</div>
        <input
          type="password"
          name="password"
          placeholder="영문, 숫자 조합 8자리 이상"
          className="signUpInput"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <div className="errorMessage">{errors.password}</div>
        )}
        </div>
       
        <div className="SignupInputContainer">
        <div className="signupTitle">비밀번호 확인</div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 입력"
          className="signUpInput"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <div className="errorMessage">{errors.confirmPassword}</div>
        )}

        </div>
       

        <button className="signupButton" onClick={handleSubmit}>
          가입하기
        </button>
      </div>
    </div>
  );
}

export default Register;
