// express 모듈 불러오기
const express = require('express');

// 다른 서버(React 등)에서 접근 허용
const cors = require('cors');

// 파일 경로 처리 모듈
const path = require('path');

// Oracle DB 사용 모듈
const oracledb = require('oracledb');

// QR코드 생성 모듈
var QRCode = require('qrcode')



/*
========================================
Router 불러오기
========================================
*/

// sample 관련 API
const sampleRouter = require("./routes/sample");

// 회원 관련 API
const userRouter = require("./routes/user");

// 피드 관련 API
const feedRouter = require("./routes/feed");



/*
========================================
DB 연결 파일 불러오기
========================================
*/
const db = require("./db");



/*
========================================
express 앱 생성
========================================
*/
const app = express();



/*
========================================
미들웨어 설정
========================================
*/

// CORS 허용
// React(3000) → Node(3010) 요청 가능
app.use(cors());


// JSON 형식 데이터 사용 가능
// req.body 사용 가능하게 해줌
app.use(express.json())



/*
========================================
EJS 설정
========================================
*/

// view engine을 ejs로 설정
app.set('view engine', 'ejs');

// ejs 파일 위치 설정
// 현재 폴더 기준
app.set('views', path.join(__dirname, '.'));



/*
========================================
Router 연결
========================================
*/

// /sample 요청 시 sampleRouter 실행
app.use("/sample", sampleRouter);

// /user 요청 시 userRouter 실행
app.use("/user", userRouter);

// /feed 요청 시 feedRouter 실행
app.use("/feed", feedRouter);




/*
========================================
서버 실행 함수
========================================
*/
async function startServer() {

  try {

    // Oracle DB 초기 연결
    await db.init();

    console.log('Successfully connected to Oracle database');



    /*
    ========================================
    서버 실행
    ========================================
    */

    app.listen(3010, () => {

      console.log('Server is running on port 3010');

    });

  } catch (err) {

    // DB 연결 실패 시 에러 출력
    console.error(
      'Error connecting to Oracle database. Server not started.',
      err
    );

    // 서버 강제 종료
    process.exit(1);
  }
}



/*
========================================
서버 시작
========================================
*/
startServer();