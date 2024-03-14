import express from "express";

export const router = express.Router();

import { signUp } from "../src/auth";



router.get('/signup', (req, res) => {
    const { username, password, email } = req.body as { username: string, password: string, email: string }; 
    if (username && password && email) {
        signUp(username, password, email).then((result:boolean) => {
            if (result) {
                res.json('{ "message": "User created" , "status": 200}');
            }
            else {
                res.json('{ "message": "User already exists" , "status": 400}');
            }
        }
        ).catch((error:Error) => {
            res.status(500).send(error
            );
        }
        );
    } else {
        res.send('You need to provide a username, password, and email');
    }
});
