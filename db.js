
  const mongoose = require("mongoose")

  const MONGO_URL = process.env.MONGO_URL

const dbConnect = () => {
    mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database is connected...");
    }).catch((err) => {
        console.log("Connection failed...");
    })
}
module.exports = dbConnect