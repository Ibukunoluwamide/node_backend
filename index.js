const express = require('express')
const app = express()
const env = require('dotenv').config()
PORT = process.env.PORT
URI = process.env.URI
const cors = require('cors')
const userRoute = require('./Routes/user.route')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user',userRoute)

const mongoose = require("mongoose")
mongoose.connect(URI).then((result) => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))