const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;



const start = async() => {
    try{
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log(`The server is running on localhost ${PORT}`)
        }) 
    }catch(err){
        console.log(err.message);
    }
    
};

start();