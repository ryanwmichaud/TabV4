import {solve} from './main.js'
import express, { response }  from 'express'
import cors from 'cors'
import  path from "path"
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..','build')))

const connection = await mysql.createConnection({  //auto releases connection
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER, // Your MySQL username
    password: process.env.MYSQL_PASSWORD, // Your MySQL password
    database: process.env.MYSQL_DATABASE_NAME // Your database name
  })

app.post('/calculate', async (req, res) => {
    const data = solve(req.body.strings, req.body.chordTones,req.body.stretch)
    res.json({ message: data})
})


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password:', error);
    }
}


app.post('/createaccount', async (req,res) => {
    const data = req.body
    let emailTaken = false
    let usernameTaken = false
    
    try {

        const passwordHash = await hashPassword(data.password)
    
        const [result] = await connection.execute(
          'INSERT INTO users3 (username, email, first_name, last_name)  VALUES (?, ?, ?, ?);',
          [data.username, data.email, data.first_name, data.last_name]
        )

        const userID = result.insertId
        console.log("puttinin dreds",userID, passwordHash)

        await connection.execute(
            'INSERT INTO UserCredentials (user_id, password_hash)  VALUES (?, ?);',
            [userID, passwordHash]
        )
        
        

        const profileResults = await connection.execute(
            'SELECT * FROM users3 WHERE email = ?;',
            [data.email]
          )
        console.log("profileToSendBack", profileResults[0][0])
      
        res.json({
            error: "none",
            emailTaken: emailTaken,
            usernameTaken: usernameTaken,
            profile: profileResults[0][0]
            
        })

    }catch (error) {

        if (error.code === 'ER_DUP_ENTRY') {
            
            if (error.sqlMessage.includes('email')) emailTaken = true
            if (error.sqlMessage.includes('username'))  usernameTaken = true

            res.json({
                error: error.sqlMessage,
                emailTaken: emailTaken,
                usernameTaken: usernameTaken
            })
        
        } else {
            res.json({
                error: error.sqlMessage,
                emailTaken: emailTaken,
                usernameTaken: usernameTaken
            })
        }
      } 
      
})

/*
app.post('/create-account-from-google', async (req,res) => {
    const data=req.body
    
    try {
        const [results, fields] = await connection.execute(
          'INSERT INTO testusers2 (email, first_name, last_name, password_hash, picture)  VALUES (?, ?, ?, ?, ?);',
          [data.email, data.first_name, data.last_name, data.password, data.picture]
        )
      
        response = {
            message: "User successfully created",
            error: "none"
        }
        res.json(response)

    }catch (error) {
        res.json({error: error})
        
      } 
      
})

*/

app.post('/get-profile', async (req, res) => {  //after auth success. seems sketchy to have this seperate
    console.log("getting profile")
    try {
        const [results, fields] = await connection.execute(
          'SELECT * FROM Users3 WHERE email = ?',
          [req.body.profileEmail]
        )
        res.json({profile: results[0]})
    }catch (error) {
        console.error(error)
        res.json({error: error})
        
      } 
})



app.post('/custom-signin', async (req, res) =>{

    const { email, password } = req.body;

    try {

        const [results] = await connection.execute(
          `SELECT password_hash 
          FROM UserCredentials
          INNER JOIN USERS3 ON UserCredentials.user_id = Users3.user_id 
          WHERE email = ?`,
          [email]
        )
        console.log(results)

        const match = await bcrypt.compare(req.body.password, results[0].password_hash);
        if(results.length == 1 && match){
            res.json({success: true})
        }else{
            res.json({success: false})
        }

    }catch (error) {
        console.error(error)
        res.json({success: false})
    }
})



app.post('/change-preference', async (req, res) => {  
    console.log("changing pref")
    console.log(req.body)
    try {
        const [results, fields] = await connection.execute(
        `INSERT INTO UserPreferences (user_id, preference_key, preference_value)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE preference_value = ?;`,
          [req.body.user_id, req.body.preference_key, req.body.preference_value,req.body.preference_value]
        )
        res.json({profile: results[0]})
    }catch (error) {
        console.error(error)
        res.json({error: error})
        
      } 
})


app.get('*', async (req,res)=>{
    //res.json({ message: "data"})
    res.sendFile(path.join(__dirname,"..", "build", "index.html")) 
})


app.listen(8000, () => {
    console.log("listening on 8000")
  })




