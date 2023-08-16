const express=require("express")
const route=require("./route.js")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")

app.use(express.json())

app.use(cors());


app.use('/',route)
mongoose.connect('mongodb+srv://sauravmahajan2007:VtQrNsNLrQPgIreS@cluster0.fno6qas.mongodb.net/dingg')
.then(()=>console.log("mongoDB Is connected"))
.catch((err)=>console.log(err))


const PORT=5000
app.listen(PORT,()=>{
    console.log(`Express Running on ${PORT}`)
})