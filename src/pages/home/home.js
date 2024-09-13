import Header from "../../component/header/header.js";
import "./home.css";

function Home() {
    return (
        <div>
            <Header />
            <img src="img/main.png" className="home-top" alt="Home Top Image"></img>
            {/* <div className="maintext"> 
                <h3>
                    "어쩌면 삶은"
                    <br />
                    "인생이라는 종이 위에"
                    <br />
                    "써 내려가는"
                    <br />
                    "펜의 기록 같습니다."
                </h3>
                <p>
                    "그중에서도 지우고 싶지 않은 기록이 있습니다."
                    <br />
                    "모나미는 언제나 당신의 행복한 기록과 함께 합니다."
                </p>
            </div> */}
            <div className="new">
                <h2>
                    "NEW"
                    <br/>
                    "ARRIVALS"
                </h2>
                <p>가장 먼저 만나는 설레는 기다림</p>
            </div>
                <div className="newarrival">
                    <img src="img/zpen.jpg" className="home-zpen"></img>
                    <img src="img/pluspen.jpg" className="home-pluspen"></img>
                    <img src="img/note.jpg" className="home-note"></img>
                    <img src="img/153pen.jpg" className="home-153pen"></img>
                    <img src="img/pluspen2.jpg" className="home-pluspen2"></img>
                </div>
                <div className="home-box2">

                </div>
            </div>
    );
}

export default Home;
