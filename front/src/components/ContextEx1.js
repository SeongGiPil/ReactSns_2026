/*
    useState : 상태(state) 저장 Hook
*/
import { useState } from "react";

/*
    Content1 컴포넌트

    부모(Main)로부터 props로
    name, age 값을 전달받음
*/
function Content1(props){

    return <>
    
        {/* 제목 출력 */}
        <h5>Content1!!!</h5>

        {/* 전달받은 이름과 나이 출력 */}
        <div>
            {props.name} , {props.age}
        </div>

    </>
}

/*
    Content2 컴포넌트
*/
function Content2(){

    return <>
    
        {/* 제목 출력 */}
        <h5>Content2!!!</h5>

    </>
}

/*
    Main 컴포넌트

    Body로부터 props 전달받음
*/
function Main(props){

    return <>
    
        {/* 메인 제목 */}
        <h4>메인!</h4>

        {/* 
            Content1에 name, age 전달
        */}
        <Content1
            name={props.name}
            age={props.age}
        >
        </Content1>

        {/* Content2 출력 */}
        <Content2></Content2>

    </>
};

/*
    왼쪽 영역 컴포넌트
*/
function LSide(){

    return <></>
};

/*
    오른쪽 영역 컴포넌트
*/
function RSide(){

    return <></>
};

/*
    Body 컴포넌트

    ContextEx1로부터
    name, age 값을 전달받음
*/
function Body(props){

    return <>
    
        {/* 제목 */}
        <h3>Body!!</h3>

        {/* 왼쪽 사이드 */}
        <LSide></LSide>

        {/* 
            Main 컴포넌트에
            name, age 전달
        */}
        <Main
            name={props.name}
            age={props.age}
        >
        </Main>

        {/* 오른쪽 사이드 */}
        <RSide></RSide>

    </>
}

/*
    최상위 컴포넌트
*/
function ContextEx1(){

    /*
        이름 상태 저장

        name : 현재 값
        setName : 값 변경 함수
    */
    let [name, setName] = useState("홍길동");

    /*
        나이 상태 저장

        age : 현재 값
        setAge : 값 변경 함수
    */
    let [age, setAge] = useState(30);

    return <>
    
        {/* 
            Body에 name, age 전달

            props 방식으로
            자식 컴포넌트에 데이터 전달
        */}
        <Body
            name={name}
            age={age}
        >
        </Body>

    </>
}

/*
    외부에서 사용할 수 있도록 export
*/
export default ContextEx1