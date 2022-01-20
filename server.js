const dotenv = require("dotenv")
const express = require("express");
const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static("public"))

// db connected

const dbConnect = require("./db")
dbConnect()

// Server connected

const server = app.listen(PORT,() => {
    console.log(`Server running Port no ${PORT}`);
})

// routes

app.use("/api", require("./routes/comment"))


// Socket 

let io = require("socket.io")(server)

io.on("connection", (socket)=>{
    socket.on("comment", (data) => {
        data.time = Date.now()
        socket.broadcast.emit("comment", data)
    })
    socket.on("typing" , (data) =>{
        socket.broadcast.emit("typing", data)
    })
})