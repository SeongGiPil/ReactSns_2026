function content1(){
    return<>
        <h5>content1!!!</h5>
    </>
}

function Main(){
    return<>
        <h4>메인!</h4>
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
    return<>
        <Body></Body>
        <Lside></Lside>
        <Rside></Rside>
        <Main></Main>
    </>
}

export default ContextEx1;