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
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 상태
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.user_id) errors.user_id = "아이디를 입력해주세요";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "올바른 이메일 주소를 입력해주세요";
    if (!formData.password || formData.password.length < 8)
      errors.password = "비밀번호는 영문, 숫자 8자리 이상이어야 합니다";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "비밀번호를 다시 확인해주세요";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "user_id") {
      setIsDuplicateChecked(false); // 아이디가 변경되면 중복 확인 상태 초기화
    }
  };

  const handleCheckDuplicate = async () => {
    if (!formData.user_id) {
      setErrors((prev) => ({
        ...prev,
        user_id: "아이디를 입력해주세요",
      }));
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/register/check-duplicate?user_id=${formData.user_id}`
      );

      if (response.ok) {
        setIsDuplicateChecked(true);
        setErrors((prev) => ({
          ...prev,
          user_id: "",
        }));
        alert("사용 가능한 아이디입니다!");
      } else {
        const errorMessage = await response.text();
        setIsDuplicateChecked(false);
        setErrors((prev) => ({
          ...prev,
          user_id: errorMessage,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("모든 항목 작성이 필요합니다.");
      return;
    }
  
    if (!isDuplicateChecked) {
      alert("아이디 중복 확인을 완료해주세요.");
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
  
      const responseText = await response.text();
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

        <label className="signup-id">아이디</label>
        <input
          type="text"
          name="user_id"
          placeholder="monami"
          className="sginput-id"
          value={formData.user_id}
          onChange={handleInputChange}
        />
        {errors.user_id && <p className="error-idmessage">{errors.user_id}</p>}
        <img
          src={errors.user_id ? "/img/redline.png" : "/img/line.png"}
          alt="아이디 라인"
          className="line-id"
        />
        <button className="signup-idconfirm" onClick={handleCheckDuplicate}>
          중복확인
        </button>

        <label className="signup-email">이메일주소</label>
        <input
          type="email"
          name="email"
          placeholder="예: Email0000@monami.com"
          className="input-email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error-emailmessage">{errors.email}</p>}
        <img
          src={errors.email ? "/img/redline.png" : "/img/line.png"}
          alt="이메일 라인"
          className="line-email"
        />

        <label className="signup-password">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="영문, 숫자 조합 8자리 이상"
          className="input-password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className="error-pwmessage">{errors.password}</p>
        )}
        <img
          src={errors.password ? "/img/redline.png" : "/img/line.png"}
          alt="비밀번호 라인"
          className="line-pw"
        />

        <label className="signup-checkpw">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 입력"
          className="input-checkpw"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <p className="error-checkpwmessage">{errors.confirmPassword}</p>
        )}
        <img
          src={errors.confirmPassword ? "/img/redline.png" : "/img/line.png"}
          alt="비밀번호 확인 라인"
          className="line-checkpw"
        />

        <button
          className="signup-button"
          onClick={handleSubmit}
          disabled={!isDuplicateChecked} // 중복 확인 여부에 따라 비활성화
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

export default Register;
