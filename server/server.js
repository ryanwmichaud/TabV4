import {solve} from './main.js';
import express  from 'express';
import cors from 'cors';
import  path from "path";
import { fileURLToPath } from 'url';
import mysql from mysql

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','build')));

const db = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "users"
})

app.post('/calculate', async (req, res) => {
    const data = solve(req.body.strings, req.body.chordTones,req.body.stretch);
    //console.log(req.body, "--> ", data)
    console.log("got req and sent res")
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