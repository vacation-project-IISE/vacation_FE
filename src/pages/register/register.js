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
<<<<<<< HEAD
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 상태
=======
>>>>>>> sieun
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.user_id) errors.user_id = "아이디를 입력해주세요";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "올바른 이메일 주소를 입력해주세요";
    if (!formData.password || formData.password.length < 8)
<<<<<<< HEAD
      errors.password = "비밀번호는 영문, 숫자 8자리 이상이어야 합니다";
=======
      errors.password = "비밀번호는 영문,숫자 8자리 이상이어야 합니다";
>>>>>>> sieun
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "비밀번호를 다시 확인해주세요";
    return errors;
  };

<<<<<<< HEAD
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
=======
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
>>>>>>> sieun
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
  
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
  
=======

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


>>>>>>> sieun
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
<<<<<<< HEAD

        <label className="signup-id">아이디</label>
=======
<div className="SignupInputContainer">
<div className="signupTitle">아이디</div>
>>>>>>> sieun
        <input
          type="text"
          name="user_id"
          placeholder="monami"
<<<<<<< HEAD
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
=======
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
>>>>>>> sieun
        <input
          type="email"
          name="email"
          placeholder="예: Email0000@monami.com"
<<<<<<< HEAD
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
=======
          className="signUpInput"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="errorMessage">{errors.email}</div>}
</div>
       
        <div className="SignupInputContainer">
        <div className="signupTitle">비밀번호</div>
>>>>>>> sieun
        <input
          type="password"
          name="password"
          placeholder="영문, 숫자 조합 8자리 이상"
<<<<<<< HEAD
          className="input-password"
=======
          className="signUpInput"
>>>>>>> sieun
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
<<<<<<< HEAD
          <p className="error-pwmessage">{errors.password}</p>
        )}
        <img
          src={errors.password ? "/img/redline.png" : "/img/line.png"}
          alt="비밀번호 라인"
          className="line-pw"
        />

        <label className="signup-checkpw">비밀번호 확인</label>
=======
          <div className="errorMessage">{errors.password}</div>
        )}
        </div>
       
        <div className="SignupInputContainer">
        <div className="signupTitle">비밀번호 확인</div>
>>>>>>> sieun
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 입력"
<<<<<<< HEAD
          className="input-checkpw"
=======
          className="signUpInput"
>>>>>>> sieun
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
<<<<<<< HEAD
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
=======
          <div className="errorMessage">{errors.confirmPassword}</div>
        )}

        </div>
       

        <button className="signupButton" onClick={handleSubmit}>
>>>>>>> sieun
          가입하기
        </button>
      </div>
    </div>
  );
}

export default Register;
