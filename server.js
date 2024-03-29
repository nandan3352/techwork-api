require("dotenv").config()
const express=require("express");
const app=express();
const path = require('path')
const PORT=process.env.PORT||3500;
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose=require("mongoose");
const connectDB=require("./config/dbConn")
const {logger,logEvents}=require("./middleware/logger")
connectDB();
app.use(logger)
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/',express.static(path.join(__dirname,"public")))
app.use('/', require('./routes/root'))
app.use("/auth",require("./routes/authRoutes"))
app.use("/users",require("./routes/userRoutes"))
app.use('/notes', require('./routes/noteRoutes'))
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))