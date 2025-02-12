import Header from "../../component/header/header.js";
import "./findIdPw.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FindIdPw() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("findId");
    const [inputEmail, setInputEmail] = useState("");
    const [inputId, setInputId] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [idErrorMessage, setIdErrorMessage] = useState("");
    const [findingId, setFindingId] = useState(false);
    const [findingPw, setFindingPw] = useState(false);
    const [authNumber, setAuthNumber] = useState(null); // 인증번호 상태
    const [foundUserId, setFoundUserId] = useState("");

    // ✅ 인증번호 입력 시 오류 메시지 초기화
    useEffect(() => {
        setErrorMessage("");
    }, [inputCode]);

    useEffect(() => {
        console.log("인증번호가 업데이트됨:", authNumber);
    }, [authNumber]); // ✅ authNumber가 변경될 때마다 로그 출력

    // 이메일 검증 함수
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // 난수 생성 함수
    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // 인증번호 전송 함수
    const HandleSendClick = async () => {
        try {
            if (
                selectedOption === "findId" &&
                (!inputEmail || !validateEmail(inputEmail))
            ) {
                setErrorMessage("이메일을 올바르게 입력해주세요.");
                return;
            }

            if (selectedOption === "findPw") {
                let hasError = false;

                if (!inputId) {
                    setIdErrorMessage("아이디를 입력해주세요.");
                    hasError = true;
                } else {
                    setIdErrorMessage("");
                }

                if (!inputEmail || !validateEmail(inputEmail)) {
                    setErrorMessage("이메일을 올바르게 입력해주세요.");
                    hasError = true;
                } else {
                    setErrorMessage("");
                }

                if (hasError) return;
            }

            // ✅ 인증번호 초기화 후 생성
            // setAuthNumber(null);
            const newAuthNumber = generateRandomNumber(111111, 999999);
            setAuthNumber(newAuthNumber);

            console.log("새로 생성된 인증번호:", newAuthNumber); // ✅ 로그로 확인

            const endpoint =
                selectedOption === "findId"
                    ? "http://localhost:4000/api/email/findId"
                    : "http://localhost:4000/api/email/findPw";

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: inputEmail,
                    user_id: selectedOption === "findPw" ? inputId : undefined,
                    authNumber: newAuthNumber,
                }),
            });

            const responseData = await response.json();
            console.log("서버 응답 데이터:", responseData); // ✅ 서버 응답 확인

            if (responseData.ok) {
                alert("인증번호를 전송하였습니다!");
                setErrorMessage("");

                // ✅ 서버에서 받은 user_id 저장
                if (responseData.user_id) {
                    setFoundUserId(responseData.user_id); // 상태에 저장
                }
            } else {
                alert(
                    responseData.message ||
                        "등록된 이메일이 아닙니다. 다시 시도해주세요."
                );
            }
        } catch (error) {
            setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            console.error("Error:", error);
        }
    };

    // 인증하기 버튼 클릭 핸들러
    const HandleConfirmCode = () => {
        if (parseInt(inputCode, 10) === authNumber) {
            if (selectedOption === "findId") {
                alert("아이디 찾기 인증에 성공하였습니다!");
                setFindingId(foundUserId);
            } else if (selectedOption === "findPw") {
                alert("비밀번호 찾기 인증에 성공하였습니다!");
                setFindingPw(true);
                navigate("/resetPw");
            }
            setErrorMessage(""); // 인증번호 에러 메시지 초기화
        } else {
            alert("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
        }
    };

    // 로그인 화면으로 돌아가기
    const HandleBackBtn = () => {
        navigate("/login");
    };

    // 아이디 찾기 버튼 클릭 시 상태 초기화
    const handleFindIdClick = () => {
        setSelectedOption("findId");
        setFindingId(false);
        setFindingPw(false);
        setErrorMessage("");
        setIdErrorMessage("");
    };

    return (
        <div>
            <Header />
            <img
                src={`img/monami_background.png`}
                alt="로그인 배경 이미지"
                className="background"
            />
            <div className="FindContainer">
                <div className="squareBox">
                    {/* 상단 버튼 */}
                    {!findingId && !findingPw && (
                        <div className="SelectIdPw">
                            <button
                                onClick={handleFindIdClick}
                                style={{
                                    color:
                                        selectedOption === "findId"
                                            ? "black"
                                            : "#c5c5c5",
                                }}
                            >
                                아이디 찾기
                            </button>
                            <button
                                onClick={() => setSelectedOption("findPw")}
                                style={{
                                    color:
                                        selectedOption === "findPw"
                                            ? "black"
                                            : "#c5c5c5",
                                }}
                            >
                                비밀번호 찾기
                            </button>
                        </div>
                    )}

                    {/* 아이디 찾기 입력 UI */}
                    {!findingId && selectedOption === "findId" && (
                        <div className="inputContainer">
                            <div className="FindText">이메일 주소 입력</div>
                            <input
                                type="text"
                                placeholder="example@ex.com"
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <img src={"img/line.png"} alt="LineImg" />
                            {errorMessage && (
                                <div className="errorMessage">
                                    {errorMessage}
                                </div>
                            )}
                            <button
                                className="SendCodeBtn"
                                onClick={HandleSendClick}
                            >
                                인증번호 전송
                            </button>
                            <div className="FindText">인증번호 입력</div>
                            <input
                                type="text"
                                placeholder="6자리 숫자를 입력해주세요"
                                onChange={(e) => setInputCode(e.target.value)}
                            />
                            <img src={"img/line.png"} alt="LineImg" />
                            <button
                                className="SendCodeBtn"
                                onClick={HandleConfirmCode}
                            >
                                인증하기
                            </button>
                        </div>
                    )}

                    {/* 비밀번호 찾기 입력 UI */}
                    {!findingPw && selectedOption === "findPw" && (
                        <div className="inputContainer">
                            <div className="FindText">아이디 입력</div>
                            <input
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                onChange={(e) => setInputId(e.target.value)}
                            />
                            <img src={"img/line.png"} alt="LineImg" />
                            {idErrorMessage && (
                                <div className="errorMessage">
                                    {idErrorMessage}
                                </div>
                            )}
                            <div className="FindText">이메일 주소 입력</div>
                            <input
                                type="text"
                                placeholder="example@ex.com"
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <img src={"img/line.png"} alt="LineImg" />
                            {errorMessage && (
                                <div className="errorMessage">
                                    {errorMessage}
                                </div>
                            )}
                            <button
                                className="SendCodeBtn"
                                onClick={HandleSendClick}
                            >
                                인증번호 전송
                            </button>
                            <div className="FindText">인증번호 입력</div>
                            <input
                                type="text"
                                placeholder="6자리 숫자를 입력해주세요"
                                onChange={(e) => setInputCode(e.target.value)}
                            />
                            <img src={"img/line.png"} alt="LineImg" />
                            <button
                                className="SendCodeBtn"
                                onClick={HandleConfirmCode}
                            >
                                인증하기
                            </button>
                        </div>
                    )}

                    {/* 아이디 찾기 성공 */}
                    {findingId && (
                        <div className="ResultContainer">
                            <div className="ResultFindText">
                                아이디는 아래와 같습니다!
                            </div>
                            <div className="FoundEmail">{findingId}</div>
                            <button
                                className="ToLoginBtn"
                                onClick={HandleBackBtn}
                            >
                                로그인하기
                            </button>
                        </div>
                    )}

                    {/* 비밀번호 찾기 성공 */}
                    {findingPw && (
                        <div className="ResultContainer">
                            <div className="ResultFindText">
                                비밀번호는 아래와 같습니다!
                            </div>
                            <div className="FoundEmail">********</div>
                            <button
                                className="ToLoginBtn"
                                onClick={HandleBackBtn}
                            >
                                로그인하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FindIdPw;