

const express =require('express');
const app = express(); 
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');

app.use(cors());
app.options('*',cors());
app.use(bodyParser.json());

const mealsList = require('./routes/meals')
const api=process.env.API_URL;

app.use(`${api}/products`,mealsList)


//server
app.listen(3001,()=>{
    console.log('Server is running http://localhost:3001');
 })