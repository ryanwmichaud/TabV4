const { solve } = require('./main'); // No need for .js if you're using .js files
const express = require('express');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const port = process.env.REACT_APP_PORT


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..','build')))

const JWT_SECRET = process.env.JWT_SECRET




const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,  
    database: process.env.MYSQL_DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
})

setInterval(async () => {
    try {
      await pool.query('SELECT 1'); // Simple keep-alive query
      console.log('Keep alive query');
    } catch (err) {
      console.error('Keep alive query failed:', err);
    }
  }, 6 * 60 * 60 * 1000); //every 6 hrs


pool.on('error', (err) => {
    console.error('Database connection error:', err);
    // reconnect?
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
    const data = req.body
    let emailTaken = false
    let usernameTaken = false

    const connection = await pool.getConnection();
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
      } finally{
        connection.release()

      }
      
})

app.post('/lookup-google-id', async(req, res) => { //if find account, send token. 
    
    const connection = await pool.getConnection();

    try{        
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
    }catch(error){
        console.error(error)
    }finally{
        connection.release()

      }
})


app.post('/create-account-from-google', async (req,res) => {
    const data=req.body

    const connection = await pool.getConnection()

    
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


    }finally{
        connection.release()

    }
      
})



app.get('/get-preferences', async (req, res)=>{

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token - Access denied' });
    }

    const connection = await pool.getConnection()


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
    }finally{
        connection.release()

    }
    


})

app.get('/get-profile', async (req, res) => {  


    
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token - Access denied' });
    }

    const connection = await pool.getConnection()

    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        const [results, fields] = await connection.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [decoded.user_id]
        )
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }else{
            console.log("sending back user_id", decoded.user_id)
            res.json({ profile: results[0] });
        }

    } catch (error) {
        console.error("error getting profile:", error)

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token.' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }finally{
        connection.release()

    }
    

    

    
    
})



app.post('/custom-signin', async (req, res) =>{

    const { email, password } = req.body;

    console.log("signin req from", email)
    
    const connection = await pool.getConnection()

    try {
        const [results] = await connection.execute(  //get passwordhash and user_id matching email
          `SELECT user_credentials.user_id, password_hash 
          FROM user_credentials
          INNER JOIN users ON user_credentials.user_id = users.user_id 
          WHERE email = ?`,
          [email]
        )

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
    }finally{
        connection.release()
    }
})
/*
INSERT INTO user_preferences (user_id, preference_key, preference_value)
VALUES (71, "testkey", "testvalue")
ON DUPLICATE KEY UPDATE preference_value = 'testvalue';
*/

app.post('/change-preference', async (req, res) => {  

    const connection = await pool.getConnection()
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
        
    }finally{
        connection.release()

    }
})


app.get('*', async (req,res)=>{
    //res.json({ message: "data"})
    res.sendFile(path.join(__dirname,"..", "build", "index.html")) 
})


app.listen(port, () => {
    console.log(`listening on ${port}`)
  })




