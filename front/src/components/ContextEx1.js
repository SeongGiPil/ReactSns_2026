import { useScrollTrigger } from "@mui/material"
import { useState } from "react"

function content1(props){
    return<>
        <h5>Content1!!!</h5>
        <div>{props.name}{props.age}</div>
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
        <Body name={name}></Body>
    
    </>
}

export default ContextEx1;