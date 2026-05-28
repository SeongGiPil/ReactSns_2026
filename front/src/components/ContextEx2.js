import { createContext, useContext, useState } from "react";

// Context 생성
const UserContext = createContext();

function Content1() {
  const user = useContext(UserContext);

  return (
    <>
      <h5>Content1!!!</h5>
      <div>
        {user.name}, {user.age}
      </div>
    </>
  );
}

function Content2() {
  const user = useContext(UserContext);

  return (
    <>
      <h5>Content2!!!</h5>
      <div>
        {user.name}, {user.age}
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      <h4>메인!</h4>
      <Content1 />
      <Content2 />
    </>
  );
}

function Body() {
  const user = useContext(UserContext);

  return (
    <>
      <h3>Body!!</h3>
      <div>
        {user.name}, {user.age}
      </div>
      <Main />
    </>
  );
}

function ContextEx1() {
  const [name, setName] = useState("홍길동");
  const [age, setAge] = useState(30);

  const user = {
    name: name,
    age: age,
  };

  return (
    <UserContext.Provider value={user}>
      <Body />
    </UserContext.Provider>
  );
}

export default ContextEx1;