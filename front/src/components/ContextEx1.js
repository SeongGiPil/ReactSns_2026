import { useState } from "react"

function content1(){
    return<>
        <h5>content1!!!</h5>
        <div>이름,나이출력</div>
    </>
}

function Main(){
    return<>
        <h4>메인!</h4>
        <content1></content1>
        <content2></content2>
    </>
};

function Lside(){return<></>};
function Rside(){return<></>};
function Body(){
    return<>
        <h3>Body!!</h3>
    </>
}

function ContextEx1(){
    let [name,setName]=useState("");
    let[age,setAge]=useState(30);
    
    return<>
        <Body></Body>
    
    </>
}

export default ContextEx1;