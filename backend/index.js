const express = require("express")
helmet = require("helmet")
cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const upload = require("express-fileupload")
require("dotenv").config()



const stripe = require("stripe")(process.env.STRIPE_KEY)
console.log(process.env.STRIPE_PUBLISHABLE_KEY)


mongoose.connect(process.env.MONGO_DB_URI , {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err))




const CarRoutes = require("./Routes/CarRoutes")

const { verifyTokenExiry } = require("./utils/Authenticate")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(upload())
app.use('/static',express.static("uploads"))

app.use(helmet())
app.use(cors({
    origin: "*"
}))


app.use("/" , CarRoutes)

app.get("/",(req,res)=>{
res.send("hello world")
});
app.get("/api" , (req , res)=>{
    res.send("Hello World")
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/verify" , verifyTokenExiry)

app.get("/config" , (req , res) =>{
    res.json({PublishAbleKey:process.env.STRIPE_PUBLISHABLE_KEY})
})


