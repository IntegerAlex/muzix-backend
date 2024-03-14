import express from "express";
import { searchYT, streamYT } from "../src/stream";
const router = express.Router();


router.get('/', (req, res) => {
    const { sessionId } = req.query as { sessionId: string } ;

})

router.get('search', (req, res) => {
    const {searchTerm, sessionId} = req.query as {searchTerm: string, sessionId: string};
    searchYT(searchTerm, sessionId).then((result) => {
        res.json(result);
    })
})

router.get('stream', (req, res) => {
    const { videoId, sessionId } = req.query as { videoId: string, sessionId: string };
    streamYT(videoId, sessionId).then((result: string) => {
        res.json(result);
    })
})
