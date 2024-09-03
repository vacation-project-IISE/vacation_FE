import React, { useState } from 'react';
import Header from "../../component/header/header.js";
import "./register.css";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = '아이디를 입력해주세요';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = '올바른 이메일 주소를 입력해주세요';
    if (!formData.password || formData.password.length < 8) errors.password = '비밀번호는 영문,숫자 8자리 이상이어야 합니다';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = '비밀번호를 다시 확인해주세요';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // 유효성 검사를 통과하면 성공 페이지로 이동
    navigate('/signup/success');
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
          name="username" 
          placeholder="monami" 
          className="sginput-id" 
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <p className="error-idmessage">{errors.username}</p>}
        <img 
          src={errors.username ? '/img/redline.png' : '/img/line.png'} 
          alt="아이디 라인" 
          className="line-id" 
        />

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
          src={errors.email ? '/img/redline.png' : '/img/line.png'}   //삼항연산자 true면 line false면 redline
          alt="이메일 라인" 
          className="line-email" 
        />

        <label className="signup-password">비밀번호</label>
        <input 
          type="password" 
          name="password" 
          placeholder="영문, 숫자 조합  8자리이상" 
          className="input-password" 
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error-pwmessage">{errors.password}</p>}
        <img 
          src={errors.password ? '/img/redline.png' : '/img/line.png'} 
          alt="비밀번호 라인" 
          className="line-pw" 
        />

        <label className="signup-checkpw">비밀번호확인</label>
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="비밀번호 입력" 
          className="input-checkpw" 
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p className="error-checkpwmessage">{errors.confirmPassword}</p>}
        <img 
          src={errors.confirmPassword ? '/img/redline.png' : '/img/line.png'} 
          alt="비밀번호 확인 라인" 
          className="line-checkpw" 
        />

        <button className="signup-button" onClick={handleSubmit}>가입하기</button>
      </div>
    </div>
  );
}

export default Register;
