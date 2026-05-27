const express = require('express');
const oracledb = require('oracledb');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_KEY = 'secret_key';
const saltRounds = 10;

// 로그인
router.post('/login', async (req, res) => {
  const { userId, pwd } = req.body;

  let connection;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `
        SELECT *
        FROM TBL_USER
        WHERE USERID = :userId
      `,
      [userId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    let isLogin = false;
    let message = '로그인 실패!';
    let token=null;

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // 입력한 비밀번호와 DB에 저장된 암호화 비밀번호 비교
      const match = await bcrypt.compare(pwd, user.PWD);

      if (match) {
        isLogin = true;
        message = '로그인 성공!';

        // 토큰에 넣을 사용자 정보
        const payload = {
          userId: user.USERID,
          userName: user.USERNAME,
          role: user.ROLE
        };

        // JWT 토큰 생성
         token = jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });
        console.log(token);
        return res.json({
          result: isLogin,
          message: message,
          token: token,
          user: payload
        });
      }
    }

    res.json({
      result: isLogin,
      message: message
    });

  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// 회원가입
router.post('/join', async (req, res) => {
  const { userId, pwd, userName } = req.body;

  let connection;

  try {
    // 비밀번호 암호화
    const hashPwd = await bcrypt.hash(pwd, saltRounds);

    connection = await db.getConnection();

    const result = await connection.execute(
      `
        INSERT INTO TBL_USER(USERID, PWD, USERNAME)
        VALUES(:userId, :hashPwd, :userName)
      `,
      [userId, hashPwd, userName],
      { autoCommit: true }
    );

    let isJoin = false;
    let message = '회원가입 실패!';

    if (result.rowsAffected > 0) {
      isJoin = true;
      message = '회원가입 성공!';
    }

    res.json({
      result: isJoin,
      message: message
    
    });

  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

module.exports = router;