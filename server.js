require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

const app = express()

//require routers here:
//TODO: require routes for Books, User-experience etc...
const users = require('./routes/users')
const readerExperiences = require('./routes/readerExperiences');
const books = require('./routes/books');

//middleware for CORS requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    next()
})

//bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connect mongo db
const db = process.env.MONGODB_URI
//connect Mongodb
mongoose.connect(db)
    .then(() => console.log('MongoDB connected... ✅'))
    .catch(err => console.log(err))

//test route
app.get('/', function(req, res) {
    res.send('Hello lovely person!\n Server is up and running')
})

app.use(passport.initialize())
//TODO: make config folder and passport page
//require('./config/passport')(passport)
//setup routes
//app.use('/users', users)
app.use('/readerExperiences', readerExperiences);
app.use("/books", books);
app.use("/users", users);

//start server
app.listen(process.env.PORT || 3001, () => console.log(`Server is running on ${process.env.PORT} and things are smooth`))