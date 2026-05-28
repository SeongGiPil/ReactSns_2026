import { useState } from "react";

function Header(props) {
    return (
        <>
            <div style={{
                padding: "50px 50px",
                backgroundColor: props.darkMode ? "#222" : "#ccc",
                color: props.darkMode ? "white" : "black",
                height: "150px"
            }}>
                헤더 !!
            </div>

            <button onClick={props.changeMode}>다크모드!</button>
        </>
    );
}

function Body(props) {
    return (
        <>
            <div style={{
                padding: "50px 50px",
                backgroundColor: props.darkMode ? "#111" : "#7c1889",

                color: props.darkMode?"white":"black",
                height: "150px"
            }}>
                바디!!
            </div>

            <Content />
        </>
    );
}

function Footer(props) {
    return (
        <>
            <div style={{
                padding: "50px 50px",
                backgroundColor: props.darkMode ? "#000" : "#3363b6",
                color:props.darkMode? "white":"black",
                height: "150px"
            }}>
                푸터 !!
            </div>
        </>
    );
}

function Content() {
    return <></>;
}

function ContextEx3() {
    const [darkMode, setDarkMode] = useState(false);

    function changeMode() {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <Header darkMode={darkMode} changeMode={changeMode} />
            <Body darkMode={darkMode} />
            <Footer darkMode={darkMode} />
        </>
    );
}

export default ContextEx3;