const express = require('express');
const oracledb = require('oracledb');
const db = require("../db");
const jwtAuthentication = require('../auth');
const multer = require('multer');

const router = express.Router();

/* ===============================
   파일 업로드 설정
================================ */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

/* ===============================
   특정 유저 피드 목록 조회
================================ */
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    let connection;

    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `
            SELECT *
            FROM TBL_FEED F
            INNER JOIN TBL_FEED_IMG I
            ON F.ID = I.FEEDID
            WHERE F.USERID = :userId
            `,
            { userId },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        res.json({
            result: "success",
            list: result.rows
        });

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error executing query');
    } finally {
        if (connection) await connection.close();
    }
});

/* ===============================
   피드 삭제
================================ */
router.delete('/:feedId', jwtAuthentication, async (req, res) => {
    const { feedId } = req.params;
    let connection;

    try {
        connection = await db.getConnection();

        await connection.execute(
            `
            DELETE FROM TBL_FEED
            WHERE ID = :feedId
            `,
            { feedId },
            { autoCommit: true }
        );

        res.json({
            result: "success",
            message: "삭제 됨"
        });

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error executing query');
    } finally {
        if (connection) await connection.close();
    }
});

/* ===============================
   피드 등록
================================ */
router.post('/', jwtAuthentication, async (req, res) => {
    const { userId, title, content } = req.body;
    let connection;

    try {
        connection = await db.getConnection();

        await connection.execute(
            `
            INSERT INTO TBL_FEED
            VALUES(FEED_SEQ.NEXTVAL, :userId, :title, :content)
            `,
            { userId, title, content },
            { autoCommit: true }
        );

        res.json({
            result: "success",
            message: "피드 등록 됨"
        });

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error executing query');
    } finally {
        if (connection) await connection.close();
    }
});

/* ===============================
   피드 이미지 업로드
================================ */
router.post('/upload', jwtAuthentication, upload.array('file'), async (req, res) => {
    const { feedId } = req.body;
    const files = req.files;

    let connection;

    try {
        connection = await db.getConnection();

        for (let file of files) {
            await connection.execute(
                `
                INSERT INTO TBL_FEED_IMG
                VALUES(FEED_IMG_SEQ.NEXTVAL, :feedId, :filename, :destination)
                `,
                {
                    feedId,
                    filename: file.filename,
                    destination: file.destination
                }
            );
        }

        await connection.commit();

        res.json({
            result: "success",
            message: "이미지 업로드 완료"
        });

    } catch (err) {
        console.log("에러 발생!", err);

        if (connection) {
            await connection.rollback();
        }

        res.status(500).send("Server Error");
    } finally {
        if (connection) await connection.close();
    }
});

module.exports = router;