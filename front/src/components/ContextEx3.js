import { useState } from "react";

// Header 컴포넌트
function Header(props) {

    return (
        <>
            {/* 헤더 영역 */}
            <div style={{

                // 안쪽 여백
                padding: "50px 50px",

                // 다크모드 여부에 따라 배경색 변경
                backgroundColor: props.darkMode ? "#787171" : "#ccc",

                // 글자색 변경
                color: props.darkMode ? "white" : "black",

                // 높이 설정
                height: "150px"

            }}>

                헤더 !!

            </div>

            {/* 버튼 클릭 시 부모의 changeMode 함수 실행 */}
            <button onClick={props.changeMode}>
                다크모드!
            </button>
        </>
    );
}

// Body 컴포넌트
function Body(props) {

    return (
        <>
            {/* 바디 영역 */}
            <div style={{

                // 안쪽 여백
                padding: "50px 50px",

                // 다크모드 여부에 따라 배경색 변경
                backgroundColor: props.darkMode ? "#111" : "#a04bac",

                // 글자색 변경
                color: props.darkMode ? "white" : "black",

                // 높이 설정
                height: "150px"

            }}>

                바디!!

            </div>

            {/* Content 컴포넌트 출력 */}
            <Content />
        </>
    );
}

// Footer 컴포넌트
function Footer(props) {

    return (
        <>
            {/* 푸터 영역 */}
            <div style={{

                // 안쪽 여백
                padding: "50px 50px",

                // 다크모드 여부에 따라 배경색 변경
                backgroundColor: props.darkMode ? "#000" : "#3363b6",

                // 글자색 변경
                color: props.darkMode ? "white" : "black",

                // 높이 설정
                height: "150px"

            }}>

                푸터 !!

            </div>
        </>
    );
}

// Content 컴포넌트
function Content() {

    // 현재는 비어있는 컴포넌트
    return <></>;
}

// 메인 컴포넌트
function ContextEx3() {

    // 다크모드 상태 저장
    // false = 일반모드
    // true = 다크모드
    const [darkMode, setDarkMode] = useState(false);

    // 다크모드 변경 함수
    function changeMode() {

        // 현재 값의 반대로 변경
        setDarkMode(!darkMode);
    }

    return (
        <>

            {/* Header에 상태와 함수 전달 */}
            <Header
                darkMode={darkMode}
                changeMode={changeMode}
            />

            {/* Body에 다크모드 상태 전달 */}
            <Body darkMode={darkMode} />

            {/* Footer에 다크모드 상태 전달 */}
            <Footer darkMode={darkMode} />

        </>
    );
}

// 외부에서 사용할 수 있도록 export
export default ContextEx3;