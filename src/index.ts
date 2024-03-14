import express from 'express';
import {router } from '../routes/user';


const app = express();
const port = 3000;


app.use('/user', router);

app.get('/', (req, res) => {
    res.sendStatus(200);
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


