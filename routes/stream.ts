import express from "express";
import {searchYT} from "../src/stream"; 
const router = express.Router();


router.get('/', (req, res) => {
    const { sessionId}: { sessionId: string} = req.query as any;

})

router.get('search', (req, res) => {
    const {searchTerm, sessionId}: {searchTerm: string, sessionId: string} = req.query as any;
    searchYT(searchTerm, sessionId).then((result: any) => {
        res.json(result);
    })
})