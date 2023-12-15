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

//Define schema for your data
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String
});

const User = mongoose.model('User', userSchema);
app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
  });
  
//Handle form submission
app.post('/submit', async(req, res) => {
    try {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        });

        //Saving user to the database
        await newUser.save();

        res.status(200).send('Form submitted successfully');
    } catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

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