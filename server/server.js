import {solve} from './main.js';

import express, { response }  from 'express';
import cors from 'cors';
import  path from "path";
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','build')));

const connection = await mysql.createConnection({  //auto releases connection
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER, // Your MySQL username
    password: process.env.MYSQL_PASSWORD, // Your MySQL password
    database: process.env.MYSQL_DATABASE_NAME // Your database name
  });

app.post('/calculate', async (req, res) => {
    const data = solve(req.body.strings, req.body.chordTones,req.body.stretch);
    //console.log(req.body, "--> ", data)
    console.log("got req and sent res")
    res.json({ message: data});
});






app.post('/createaccount', async (req,res) => {
    const data=req.body
    let emailTaken = false
    let usernameTaken = false
    
    try {
    
        const [results, fields] = await connection.execute(
          'INSERT INTO testusers2 (username, email, first_name, last_name, password)  VALUES (?, ?, ?, ?, ?);',
          [data.username, data.email, data.first_name, data.last_name, data.password]
        )
      
        res.json({
            error: "none",
            emailTaken: emailTaken,
            usernameTaken: usernameTaken
        })

    }catch (err) {
        console.log(err)

        if (err.code === 'ER_DUP_ENTRY') {
            
            if (err.sqlMessage.includes('email')) emailTaken = true
            if (err.sqlMessage.includes('username'))  usernameTaken = true

            res.json({
                error: err.sqlMessage,
                emailTaken: emailTaken,
                usernameTaken: usernameTaken
            })
        
        } else {
            res.json({
                error: err.sqlMessage,
                emailTaken: emailTaken,
                usernameTaken: usernameTaken
            })
        }
      } 
      
})


app.post('/create-account-from-google', async (req,res) => {
    const data=req.body
    console.log(data)
    
    try {
        const [results, fields] = await connection.execute(
          'INSERT INTO testusers2 (email, first_name, last_name, password, picture)  VALUES (?, ?, ?, ?, ?);',
          [data.email, data.first_name, data.last_name, data.password, data.picture]
        )
      
        response = {
            message: "User successfully created",
            error: "none"
        }
        console.log("success")
        res.json(response);

    }catch (err) {
        console.log("error")
        res.json({error: err});
        
      } 
      
})

app.post('/lookup-email', async (req,res) => {

    try {
        const [results, fields] = await connection.execute(
          'SELECT * from testusers2 WHERE email = ? )',
          [req.body.email]
        )
      
        response = {
            results: results,
        }
        console.log("success")
        res.json(response);

    }catch (err) {
        res.json({error: err});
        
      } 

})

app.get('*', async (req,res)=>{
    //res.json({ message: "data"});
    res.sendFile(path.join(__dirname,"..", "build", "index.html")) 
});


app.listen(8000, () => {
    console.log("listening on 8000")
  });




