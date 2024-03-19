const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 7001;
const path = require("path");
const Data = require("./models/data.js");

// Middlewares
app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


main().then(()=>{
    console.log("connection succefull");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/login")
}

app.get("/", (req,res)=>{
    res.render("login.ejs");
})

app.get("/sign", (req,res)=>{
    res.render("sign.ejs");
})


// Register USer
app.post("/sign", async (req,res)=>{
    let {name,password} = req.body;
    let newData = new Data({
        name:name,
        password:password,
    });

    let nData= await Data.insertMany([newData]);
    console.log(nData);
    res.render("home.ejs");
    // res.send("done");

    // const data = {
    //     name: req.body.name,
    //     password: req.body.password
    // }

    // const userData = await Data.insertMany(data);
    // console.log(userData);
    // res.send("Done");

});

app.post("/login",  async (req,res)=>{
    try{
        const check = await Data.findOne({name:req.body.name})
        if(check.password === req.body.password){
            res.render("home.ejs");
        }
        else{
            res.send("Wrong Password");
        }
    }
    catch{

        res.render("error.ejs");

    }
})



app.listen(port, ()=>{
    console.log("server is listing on port", port);
})