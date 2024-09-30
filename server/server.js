import {solve} from './main.js'
import express, { response }  from 'express'
import cors from 'cors'
import  path from "path"
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..','build')))

const JWT_SECRET = process.env.JWT_SECRET

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
        console.error("error hashing password:", error)
    }
}



app.post('/create-account', async (req,res) => {
    console.log("creating with",req.body)
    const data = req.body
    let emailTaken = false
    let usernameTaken = false
    
    try {

        //hash password and compare it
        const passwordHash = await hashPassword(data.password)  
    
        const [result] = await connection.execute(
          'INSERT INTO users (username, email, first_name, last_name)  VALUES (?, ?, ?, ?);',
          [data.username, data.email, data.first_name, data.last_name]
        )


        //get user_id back and insert it w hash
        const user_id = result.insertId  

        await connection.execute(
            'INSERT INTO user_credentials (user_id, password_hash)  VALUES (?, ?);',
            [user_id, passwordHash]
        )


        //send back token
        const token = jwt.sign({user_id: user_id}, JWT_SECRET, {expiresIn: '1hr'})
        


        res.json({
            error: "none",
            emailTaken: emailTaken,
            usernameTaken: usernameTaken,
            token: token
            
        })

    }catch (error) {
        console.error("error creating account:", error)


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
                error: "other error",
                emailTaken: emailTaken,
                usernameTaken: usernameTaken
            })
        }
      } 
      
})

app.post('/lookup-google-id', async(req, res) => { //if find account, send token. 
    const google_id = req.body.google_id
    const [result] = await connection.execute(
        'SELECT user_id FROM users WHERE google_id = ? ;',
        [google_id]
      )
    if (result.length === 1){
        const token = jwt.sign({user_id: result[0].user_id}, JWT_SECRET, {expiresIn: '1hr'})

        res.json({found: true, token: token})
    }else{
        res.json({found: false})
    }
})


app.post('/create-account-from-google', async (req,res) => {
    const data=req.body
    
    try {
        //google has verified its them and we haven't found an account for them
        //make and account and send a token

       
        const [result] = await connection.execute(
            'INSERT INTO users (email, username, first_name, last_name, profile_photo, google_id) VALUES (?, ?, ?, ?, ?, ?)',
            [data.email, data.email, data.first_name, data.last_name, data.profile_photo, data.google_id]
        )
        const user_id = result.insertId 

        const token = jwt.sign({user_id: user_id}, JWT_SECRET, {expiresIn: '1hr'})

        res.json({token: token})
        //if already used, get them a token, get  profile with it on the front end
        //if not, make account - ask for a username
        
      } 
    catch(error){
        console.error("error creating account from google:", error)


    }
      
})



app.get('/get-preferences', async (req, res)=>{

    const token = req.headers['authorization']?.split(' ')[1];
    console.log("getting preferences", token)

    if (!token) {
        return res.status(401).json({ message: 'No token - Access denied' });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        const results = await connection.execute( `SELECT * FROM user_preferences WHERE user_id = ?`, [decoded.user_id])

        
        if (results.length === 0) {
            return res.status(404).json({ message: 'no preferences found' });
        }else{
            res.json({ preferences: results[0] });
        }

    } catch (error) {
        console.error("error getting preferences:", error)

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token.', error });
        } else {
            return res.status(500).json({ message: 'Internal server error', error});
        }
    }
    


})

app.get('/get-profile', async (req, res) => {  
    
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("getting profile w token", token)

    if (!token) {
        return res.status(401).json({ message: 'No token - Access denied' });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        const [results, fields] = await connection.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [decoded.user_id]
        )
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }else{
            
            res.json({ profile: results[0] });
        }

    } catch (error) {
        console.error("error getting profile:", error)

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token.' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    

    

    
    
})



app.post('/custom-signin', async (req, res) =>{

    const { email, password } = req.body;
    

    try {

        const [results] = await connection.execute(  //get passwordhash and user_id matching email
          `SELECT user_credentials.user_id, password_hash 
          FROM user_credentials
          INNER JOIN users ON user_credentials.user_id = users.user_id 
          WHERE email = ?`,
          [email]
        )
        console.log(results)

        const match = await bcrypt.compare(req.body.password, results[0].password_hash);
        if(results.length == 1 && match){
            const token = jwt.sign({user_id: results[0].user_id}, JWT_SECRET, {expiresIn: '1hr'})
            res.json({success: true, token: token})
        }else{
            res.json({success: false})
        }

    }catch (error) {
        console.error("error signing in", error)

        res.json({success: false})
    }
})
/*
INSERT INTO user_preferences (user_id, preference_key, preference_value)
VALUES (71, "testkey", "testvalue")
ON DUPLICATE KEY UPDATE preference_value = 'testvalue';
*/

app.post('/change-preference', async (req, res) => {  
    try {
        const decoded = jwt.verify(req.body.token, JWT_SECRET)
        const [results, fields] = await connection.execute(
        `INSERT INTO user_preferences (user_id, preference_key, preference_value)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE preference_value = ?;`,
          [decoded.user_id, req.body.preference_key, req.body.preference_value,req.body.preference_value]
        )
        res.json({profile: results[0]})
    }catch (error) {
        console.error("error changing preferences:", error)

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




