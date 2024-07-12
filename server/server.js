import {solve} from './main.js';
import express  from 'express';
import cors from 'cors';
import  path from "path";
import { fileURLToPath } from 'url';
import  mysql from 'mysql2';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','build')));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy','same-origin', 'same-origin-allow-popups');
    next();
});

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user:  process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME
})
 
app.post('/login', (req,res)=>{
    const sql = "SELECT * FROM users WHERE username = ? AND password =?";
  
    connection.query(sql, [req.body.email, req.body.password], (err, data)=>{  //query string, placeholders, error function callback
        if(err){
            return res.json(err);
        }
        if(data.length>0){
            return res.json("Login Success");
        }else{
            console.log(req.body.email, req.body.password)
            return res.json("No account with those credentials")
        }
    })
})

app.post('/calculate', async (req, res) => {
    const data = solve(req.body.strings, req.body.chordTones,req.body.stretch);
    //console.log(req.body, "--> ", data)
    console.log("sent results back")
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