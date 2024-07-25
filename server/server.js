import {solve} from './main.js';

import express  from 'express';
import cors from 'cors';
import  path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','build')));



app.post('/calculate', async (req, res) => {
    console.log(req)
    const data = solve(req.body.strings, req.body.chordTones,req.body.stretch);
    //console.log(req.body, "--> ", data)
    //console.log("got req and sent res")
    res.json({ message: data});
});

app.get('*', async (req,res)=>{
    //res.json({ message: "data"});
    console.log("sent page");
    res.sendFile(path.join(__dirname,"..", "build", "index.html")) 
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });