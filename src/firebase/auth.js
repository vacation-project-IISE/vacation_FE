// src/firebase/auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";  // 이제 정상적으로 import 가능

// Firebase Authentication 인스턴스 생성
const auth = getAuth(app);

// 사용자 등록 (Sign Up) 함수
export async function signUp(email, password) {
  try {
    // Firebase Authentication의 createUserWithEmailAndPassword 메서드를 사용하여 사용자 등록
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 사용자 등록 성공 후 유저 정보 출력
    console.log("회원가입 데이터: ", userCredential.user);
    
    // 사용자 정보를 반환
    return userCredential.user;
  } catch (error) {
    // 오류가 발생하면 콘솔에 오류 메시지 출력
    console.error("회원가입 오류: ", error.message);
    throw error; // 오류를 throw하여 호출한 곳에서 처리하도록 함
  }
}

// 사용자 로그인 (Sign In) 함수
export async function signIn(email, password) {
  try {
    // Firebase Authentication의 signInWithEmailAndPassword 메서드를 사용하여 로그인
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // 로그인 성공 후 유저 정보 출력
    console.log("로그인 데이터: ", userCredential.user);
    
    // 사용자 정보를 반환
    return userCredential.user;
  } catch (error) {
    // 오류가 발생하면 콘솔에 오류 메시지 출력
    console.error("로그인 오류: ", error.message);
    throw error; // 오류를 throw하여 호출한 곳에서 처리하도록 함
  }
}
