/*
    useContext : Context 값 사용 Hook
    useState : 상태(state) 저장 Hook
*/
import { useContext, useState } from "react";

/*
    UserContext import

    다른 파일에서 생성한 Context 객체
*/
import { UserContext } from "./context/UserContext";

/*
    Content1 컴포넌트
*/
function Content1(props){

    /*
        Context에 저장된 값 가져오기

        현재 UserContext 안에 있는
        value 값을 가져옴
    */
    let user = useContext(UserContext);

    // 콘솔 출력
    console.log("user ==> ", user);

    return <>
    
        {/* 제목 */}
        <h5>Content1!!!</h5>

        {/* Context 값 출력 */}
        <div>
            {user.name}, {user.age}
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
*/
function Main(props){

    return <>
    
        {/* 메인 제목 */}
        <h4>메인!</h4>

        {/* Content1 출력 */}
        <Content1></Content1>

        {/* Content2 출력 */}
        <Content2></Content2>

    </>
};

/*
    왼쪽 사이드 컴포넌트
*/
function LSide(){

    return <></>
};

/*
    오른쪽 사이드 컴포넌트
*/
function RSide(){

    return <></>
};

/*
    Body 컴포넌트
*/
function Body(props){

    return <>
    
        {/* 제목 */}
        <h3>Body!!</h3>

        {/* 왼쪽 사이드 */}
        <LSide></LSide>

        {/* 메인 영역 */}
        <Main></Main>

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

    /*
        return 안의 Provider가
        하위 컴포넌트 전체에 데이터 제공

        value={{name, age}}

        ↓ 실제 의미

        value={{
            name : name,
            age : age
        }}
    */

    return <>
    
        {/* Context 데이터 제공 */}
        <UserContext.Provider value={{name, age}}>

            {/* 하위 컴포넌트 */}
            <Body></Body>

        </UserContext.Provider>

    </>
}

/*
    외부에서 사용할 수 있도록 export
*/
export default ContextEx1;