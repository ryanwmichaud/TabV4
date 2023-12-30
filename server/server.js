import {solve} from './main.js';

import express  from 'express';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    console.log(req.body)
    const data = solve(req.body.strings, req.body.chordTones,req.body.stretch);

    
    res.json({ message: data});
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });