require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//Import Routes
const authentication = require("./routes/auth")
const user = require("./routes/user")
const category = require("./routes/category")
const product = require("./routes/product")


//App application
const app = express()

//Application port
const port = process.env.port || 8000

//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(obj=>{
    console.log("Database Connected")
}).catch(err=>{
    console.log(err)
})

//Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes 
app.use("/api",authentication)
app.use("/api",user)
app.use("/api",category)
app.use("/api",product)

app.listen(port,()=>{
    console.log(`App running ........ at port ${port}`)
})