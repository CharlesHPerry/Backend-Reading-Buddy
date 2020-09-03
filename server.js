require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//require routers here:
//TODO: require routes for Books, User-experience etc...
const users = require('./routes/users')
const books = require('./routes/books');
const readerExperiences = require('./routes/readerexperiences');

//middleware for CORS requests
app.use(cors({
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    next()
})
console.log('butts butts')
//bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connect mongo db
const uri = process.env.MONGODB_URI
//connect Mongodb

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
mongoose.connect(uri)
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


app.use("/books", books);
app.use('/readerExperiences', readerExperiences);
app.use("/users", cors(), users);

//start server
app.listen(process.env.PORT || 3001, () => console.log(`Server is running on ${process.env.PORT} and things are smooth`))