
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

const  data = "mongodb+srv://smprogrammer788:GqT1ik6vhXflbiE7@nibh.xr8r1fu.mongodb.net/NIBH?retryWrites=true&w=majority"

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${data}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




