import express from 'express';
import {router } from '../routes/user';
const HLSServer  = require('hls-server')
import path from 'path'
import bodyParser from 'body-parser';


const app = express();
// const view = express(); // view server
const port = 8080;

app.use(bodyParser.json());
app.use('/user', router);


app.get('/', (req, res) => {
    res.sendStatus(200);
});




// const hls = new HLSServer({
//     path: '/h', // Endpoint for HLS stream
//     dir: 'audio/', // Directory containing the MP3 file
//     provider: {
//         exists: (req:any, callback:any) => {
//             // Check if the MP3 file exists
//             const filePath = path.join(__dirname, 'audio/yourSessionId.mp3');
//             callback(null, filePath);
//         }
//     }
// });
    
// hls.run()


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
